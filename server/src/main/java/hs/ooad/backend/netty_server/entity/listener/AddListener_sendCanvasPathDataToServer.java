package hs.ooad.backend.netty_server.entity.listener;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.DataListener;

import org.json.JSONObject;


public class AddListener_sendCanvasPathDataToServer implements AddListener {

    @Override
    public void addListener(SocketIOServer server) {
        server.addEventListener("sendCanvasPathDataToServer", String.class, new DataListener<String>() {
      
            @Override
            public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
            }
          });
    }

}
