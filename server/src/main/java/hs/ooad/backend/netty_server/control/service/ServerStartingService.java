package hs.ooad.backend.netty_server.control.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hs.ooad.backend.netty_server.control.interfaces.ServerStarting;
import hs.ooad.backend.netty_server.entity.ServerCatalog;

@Service
public class ServerStartingService implements ServerStarting {

    @Autowired
    ServerCatalog serverCatalog;

    @Override
    public void startServer() {
        serverCatalog.startServer();
    }

}
