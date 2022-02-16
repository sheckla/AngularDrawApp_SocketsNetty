package hs.ooad.backend.netty_server.boundary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import hs.ooad.backend.application_startpoint.acl.ContractWithNettyServer;
import hs.ooad.backend.netty_server.control.interfaces.ServerStarting;

@Component("contractWithNettyServer")
public class ServerBoundary implements ContractWithNettyServer {

    @Autowired
    ServerStarting serverStarting;

    @Override
    public void startServer() {
        serverStarting.startServer();
    }

}
