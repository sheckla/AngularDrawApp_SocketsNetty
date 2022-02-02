package server;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;

public class Server {
	
	private Configuration config;
    private SocketIOServer server;
    
    public Server() {
    }
    
    public void start() {
    	initConfig();
    	initServer();
    }
    
	private void initConfig() {
		this.config = new Configuration();
    	this.config.setHostname("localhost");
    	this.config.setPort(9092);
	}

	private void initServer() {
		this.server = new SocketIOServer(this.config);
  
		this.server.addConnectListener(new ConnectListener() {
			
			@Override
			public void onConnect(SocketIOClient client) {
				System.out.println("ClientID: " + client.getSessionId() + " is connected!");
				client.sendEvent("testEvent", "Hallo Welt");
			}
		});
		
		this.server.addDisconnectListener(new DisconnectListener() {
			
			@Override
			public void onDisconnect(SocketIOClient client) {
				System.out.println("ClientID: " + client.getSessionId() + " is disconnected!");
			}
		});
		
		this.server.addEventListener("test", String.class, new DataListener<String>() {

			@Override
			public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
				System.out.println("Data: " + data);
			}
			
		});
		
		
		server.start();

        try {
			Thread.sleep(Integer.MAX_VALUE);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

        server.stop();
        
	}
}
