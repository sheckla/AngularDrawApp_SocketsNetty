package hs.ooad.backend.application_startpoint.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import hs.ooad.backend.application_startpoint.acl.ContractWithNettyServer;

@Component("startServer")
public class StartServerService implements StartServer {

    @Autowired
    private ApplicationContext context;

    @Override
    public void startServer() {
        ContractWithNettyServer contractWithNettyServer = (ContractWithNettyServer) context
                .getBean("contractWithNettyServer");
        contractWithNettyServer.startServer();
    }

}
