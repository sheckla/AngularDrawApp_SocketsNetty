package hs.ooad.netty_server.gateway.listener;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import hs.ooad.netty_server.gateway.interfaces.AddListener;

public class AddListener_OnConnect implements AddListener {

  public AddListener_OnConnect() {

  }

  @Override
  public void addListener(SocketIOServer server) {
    server.addConnectListener(new ConnectListener() {

      @Override
      public void onConnect(SocketIOClient client) {
        System.out.println("ClientID: " + client.getSessionId() + " is connected!");
      }
    });
  }
}
