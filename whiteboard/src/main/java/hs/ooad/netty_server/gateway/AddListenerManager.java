package hs.ooad.netty_server.gateway;

import java.util.ArrayList;

import com.corundumstudio.socketio.SocketIOServer;

import hs.ooad.netty_server.gateway.interfaces.AddListener;

public class AddListenerManager {
  private ArrayList<AddListener> listeners;

  public AddListenerManager() {
    this.listeners = new ArrayList<>();
  }

  public void add(AddListener listener) {
    this.listeners.add(listener);
  }

  public void addToServer(SocketIOServer server) {
    for (AddListener al : this.listeners) {
      al.addListener(server);
    }
  }
}
