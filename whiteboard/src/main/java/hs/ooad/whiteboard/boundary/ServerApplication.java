package hs.ooad.whiteboard.boundary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import hs.ooad.whiteboard.control.interfaces.StartServer;

@SpringBootApplication
@ComponentScan({"hs.ooad"})
public class ServerApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(ServerApplication.class, args);
		StartServer startServer = (StartServer) ctx.getBean("startServer");
		startServer.startServer();
	}

}
