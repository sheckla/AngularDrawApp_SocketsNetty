package hs.ooad.backend.netty_server.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

// ctl + k -> o
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.google.gson.Gson;

import org.json.JSONObject;
import org.springframework.stereotype.Component;

import hs.ooad.backend.netty_server.entity.listener.AddListener_OnConnect;
import hs.ooad.backend.netty_server.entity.listener.AddListener_OnDisconnect;
import hs.ooad.backend.netty_server.entity.listener.AddListener_chatMessageToServer;
import hs.ooad.backend.netty_server.entity.listener.AddListener_createRoomr;
import hs.ooad.backend.netty_server.entity.listener.AddListener_enterRoom;
import hs.ooad.backend.netty_server.entity.listener.AddListener_leaveRoom;
import hs.ooad.backend.netty_server.entity.listener.AddListener_requestRoomClientsIDs;
import hs.ooad.backend.netty_server.entity.listener.AddListener_requestRoomClientsNames;
import hs.ooad.backend.netty_server.entity.listener.AddListener_resetPathsRequestfromClient;
import hs.ooad.backend.netty_server.entity.listener.AddListener_sendCanvasPathDataToServer;
import hs.ooad.backend.netty_server.entity.listener.AddListener_sendClientNameToServer;

@Component("serverCatalog")
public class Server implements ServerCatalog {
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
    
    AddListenerManager addListenerToServer = new AddListenerManager();
    addListenerToServer.add(new AddListener_OnConnect());
    addListenerToServer.add(new AddListener_OnDisconnect());
    /*     addListenerToServer.add(new AddListener_sendCanvasPathDataToServer());
    addListenerToServer.add(new AddListener_chatMessageToServer());
    addListenerToServer.add(new AddListener_resetPathsRequestfromClient());
    addListenerToServer.add(new AddListener_createRoomr());
    addListenerToServer.add(new AddListener_enterRoom());
    addListenerToServer.add(new AddListener_leaveRoom());
    addListenerToServer.add(new AddListener_requestRoomClientsIDs());
    addListenerToServer.add(new AddListener_requestRoomClientsNames());
    addListenerToServer.add(new AddListener_sendClientNameToServer()); */
    addListenerToServer.addToServer(server);
    
    server.addEventListener("sendCanvasPathDataToServer", String.class, new DataListener<String>() {
      
      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        String roomID = getRoomId(client);
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
        String roomID = getRoomId(client);
        server.getRoomOperations(roomID).sendEvent("resetPathsRequestToClient");
      }
    });
    
    server.addEventListener("createRoom", String.class, new DataListener<String>() {
      
      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        String roomID = data;
        
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
        String roomID = data;
        
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
    
    server.addEventListener("requestRoomClientsNames", String.class, new DataListener<String>() {
      
      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        String roomID = getRoomId(client);
        server.getRoomOperations(roomID).sendEvent("requestRoomClientsNamesFromServer", client);
      }
    });
    
    server.addEventListener("sendClientNameToServer", String.class, new DataListener<String>() {
      
      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        String roomID = getRoomId(client);
        server.getRoomOperations(roomID).sendEvent("sendClientNameToClients", data);
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
  public void addClientToRoom(SocketIOClient client, String roomID) {
    client.leaveRoom("");
    client.joinRoom(roomID);
    roomIDs.add(roomID);
    server.getRoomOperations(roomID).sendEvent("enterRoomSuccessfull", roomID);
  }
  
  
  public String getRoomId(SocketIOClient client) {
    return client.getAllRooms().toArray()[0].toString();
  }
}
