package hs.ooad.netty_server.boundary;
import java.util.ArrayList;
import java.util.List;

// ctl + k -> o
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import org.json.*;

import org.springframework.stereotype.Component;

import hs.ooad.whiteboard.acl.ContractWithNettyServer;
import io.netty.util.internal.SocketUtils;

@Component("contractWithNettyServer")
public class Server implements ContractWithNettyServer {

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
        server.getBroadcastOperations().sendEvent("test", "alex");
      }
    });

    server.addEventListener("test", String.class, new DataListener<String>() {

      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        System.out.println("Data: " + data);
      }
    });

    server.addEventListener("notifyClients", String.class, new DataListener<String>() {

      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        System.out.println(data + " from @" + client.getSessionId());
        server.getBroadcastOperations().sendEvent("notifyClients", client.getSessionId());
      }
    });

    server.addEventListener("sendCanvasPathDataToServer", String.class, new DataListener<String>() {

      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
        JSONObject obj = new JSONObject(data);
        System.out.println("Main object" + obj);

        List<String> vals = new ArrayList<String>();
        JSONArray arr = obj.getJSONArray("paths");
        for (int i = 0; i < arr.length()-1; i++) {
          System.out.println("Object" + i + " - " + arr.getJSONObject(i));
        }
        System.out.println("sendCanvasPathDataToServer: " + obj);
        server.getBroadcastOperations().sendEvent("sendCanvasPathDataToClient", obj.toString());
      }
    });
    server.addEventListener("chatMessageToServer", String.class, new DataListener<String>() {

      @Override
      public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {

        server.getBroadcastOperations().sendEvent("chatMessageToClient", data);
      }
    });
  }
}
