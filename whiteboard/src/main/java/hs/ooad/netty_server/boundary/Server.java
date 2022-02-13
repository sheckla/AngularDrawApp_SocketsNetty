package hs.ooad.netty_server.boundary;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// ctl + k -> o
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.google.gson.Gson;

import org.json.*;
import org.springframework.stereotype.Component;

import hs.ooad.whiteboard.acl.ContractWithNettyServer;
import io.netty.util.internal.SocketUtils;

@Component("contractWithNettyServer")
public class Server implements ContractWithNettyServer {
  private Set<String> roomIDs = new HashSet<>();
  private Configuration config = new Configuration();
  private SocketIOServer server;

  @Override
  public void startServer() {
    init();
    this.server.start();

    try {
      Thread.sleep(Integer.MAX_VALUE);
    } catch (InterruptedException e) {

    }

    this.server.stop();

  }

  private void init() {
    this.config.setHostname("localhost");
    this.config.setPort(9092);
    this.server = new SocketIOServer(this.config);

    this.server.addConnectListener(new ConnectListener() {

      @Override
      public void onConnect(SocketIOClient client) {
        System.out.println("ClientID: " + client.getSessionId() + " is connected!");
      }
    });

    this.server.addDisconnectListener(new DisconnectListener() {

      @Override
      public void onDisconnect(SocketIOClient client) {
        System.out.println("ClientID: " + client.getSessionId() + " disconnected!");
        server.getBroadcastOperations().sendEvent("clientDisconnected");
      }
    });

    server.addEventListener("sendCanvasPathDataToServer", String.class, new DataListener<String>() {

      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        String roomID =  getRoomId(client);
        JSONObject obj = new JSONObject(data);
        System.out.println(client.getSessionId() + " send paths");
        server.getRoomOperations(roomID).sendEvent("sendCanvasPathDataToClient", client, obj.toString());
      }
    });

    server.addEventListener("chatMessageToServer", String.class, new DataListener<String>() {

      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        String roomID = getRoomId(client);
        server.getRoomOperations(roomID).sendEvent("chatMessageToClient", data);
      }
    });

    // Global Paths reset for all connected clients
    server.addEventListener("resetPathsRequestfromClient", String.class, new DataListener<String>() {

      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        String roomID =  getRoomId(client);
        server.getRoomOperations(roomID).sendEvent("resetPathsRequestToClient");
      }
    });

    server.addEventListener("createRoom", String.class, new DataListener<String>() {

      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        String roomID = "room" + data;

        if (roomIDs.contains(roomID)) {
          client.sendEvent("createRoomFailure"); // room already exists - can't override
          return;
        }

        addClientToRoom(client, roomID);
      }
    });

    server.addEventListener("enterRoom", String.class, new DataListener<String>() {

      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        String roomID = "room" + data;

        if (!roomIDs.contains(roomID)) {
          client.sendEvent("enterRoomFailure");
          return;
        }

        addClientToRoom(client, roomID);
      }
    });

    // Client closes application or disconnects from Session
    server.addEventListener("leaveRoom", String.class, new DataListener<String>() {

      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        String roomID = getRoomId(client);
        client.leaveRoom(roomID);

        ArrayList<String> clientIDs = getClientsIDs(roomID);
        for (String s : clientIDs) {
          System.out.println(s);
        }
        if (clientIDs.size() == 0) {
          // discards empty client session from the Server Roomlist
          roomIDs.remove(roomID);
        }

        // Notify other connected clients with updated Client-list (json)
        String json = new Gson().toJson(clientIDs);
        server.getRoomOperations(roomID).sendEvent("sendRoomClientsIDs", json);

        // Notify other connected clients about the specific client who left
        server.getRoomOperations(roomID).sendEvent("clientDisconnected", client.getSessionId());
      }
    });


    // Returns the unique Client-Session ID's as json
    server.addEventListener("requestRoomClientsIDs", String.class, new DataListener<String>() {

      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        String roomID = getRoomId(client);
        ArrayList<String> clientIDs = getClientsIDs(roomID);
        String json = new Gson().toJson(clientIDs);
        server.getRoomOperations(roomID).sendEvent("sendRoomClientsIDs", json);
      }
    });
  }

  private ArrayList<String> getClientsIDs(String roomID) {
    Collection<SocketIOClient> clients = server.getRoomOperations(roomID).getClients();
    ArrayList<String> clientIDs = new ArrayList<>();
    clients.forEach((temp) -> {
      clientIDs.add(temp.getSessionId().toString());
    });
    return clientIDs;
  }

  // Adds client to room and responds with the assigned roomID
  private void addClientToRoom(SocketIOClient client, String roomID) {
    client.leaveRoom("");
    client.joinRoom(roomID);
    roomIDs.add(roomID);
    server.getRoomOperations(roomID).sendEvent("enterRoomSuccessfull", roomID);
  }

  private String getRoomId(SocketIOClient client) {
      return client.getAllRooms().toArray()[0].toString();
  }
}
