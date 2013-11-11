package com.example.helloworld;

import java.io.IOException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class HelloWorldServlet extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
	      process(request, response);
	    }

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
	      process(request, response);
	 }
    public void process(HttpServletRequest req, HttpServletResponse response)
            throws IOException {
    	 Properties props = new Properties();
         Session session = Session.getDefaultInstance(props, null);
  
         String msgBody = "YO YO YOOYOYOYYOYO";
  
         try {
             Message msg = new MimeMessage(session);
             msg.setFrom(new InternetAddress("prateek.bvcoe@gmail.com",
                     "Your admin"));
             msg.addRecipient(Message.RecipientType.TO, new InternetAddress(
                     "httperror503@gmail.com", "Aakash"));
             msg.setSubject("Feedback");
             msg.setText(msgBody);
             Transport.send(msg);
  
         } catch (Exception e) {
             response.setContentType("text/plain");
             response.getWriter().println("Something went wrong. Please try again.");
             throw new RuntimeException(e);
         }
  
         response.setContentType("text/plain");
         response.getWriter().println(
                 "Thank you for your feedback. An Email has been send out.");

    	//response.sendRedirect("/index.html"); 
    }
}
