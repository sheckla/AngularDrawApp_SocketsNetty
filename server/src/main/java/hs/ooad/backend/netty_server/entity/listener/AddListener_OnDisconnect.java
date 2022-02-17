package hs.ooad.backend.netty_server.entity.listener;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.DisconnectListener;

public class AddListener_OnDisconnect implements AddListener{

    @Override
    public void addListener(SocketIOServer server) {
        server.addDisconnectListener(new DisconnectListener() {

            @Override
            public void onDisconnect(SocketIOClient client) {
              System.out.println("ClientID: " + client.getSessionId() + " disconnected!");
              server.getBroadcastOperations().sendEvent("clientDisconnected", client.getSessionId());
            }
          });
    }
}
