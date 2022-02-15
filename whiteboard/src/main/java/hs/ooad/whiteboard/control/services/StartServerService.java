package hs.ooad.whiteboard.control.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import hs.ooad.whiteboard.acl.ContractWithNettyServer;
import hs.ooad.whiteboard.control.interfaces.StartServer;

@Component("startServer")
public class StartServerService implements StartServer {

    @Autowired
    private ApplicationContext context;

    @Override
    public void startServer() {
        ContractWithNettyServer contractWithNettyServer = (ContractWithNettyServer) context.getBean("contractWithNettyServer");
        contractWithNettyServer.startServer();
    }

}
