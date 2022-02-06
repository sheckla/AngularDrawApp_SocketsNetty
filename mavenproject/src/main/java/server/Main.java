package server;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;

public class Main {
	
	private static Configuration config = new Configuration();
    private static SocketIOServer server;
    
    private Main() {}
    
	public static void main(String[] args) {
		config.setHostname("localhost");
    	config.setPort(9092);
    	server = new SocketIOServer(config);
    	
    	server.addConnectListener(new ConnectListener() {
			
			@Override
			public void onConnect(SocketIOClient client) {
				System.out.println("ClientID: " + client.getSessionId() + " is connected!");
			}
		});
		
		server.addDisconnectListener(new DisconnectListener() {
			
			@Override
			public void onDisconnect(SocketIOClient client) {
				System.out.println("ClientID: " + client.getSessionId() + " is disconnected!");
			}
		});
		
		server.addEventListener("test", String.class, new DataListener<String>() {

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
