package com.example.helloworld;

import java.io.IOException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class HelloWorldServlet extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
	      process(request, response);
	    }

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
	      process(request, response);
	 }
    public void process(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        resp.setContentType("text/plain");
        String id = req.getParameter("name");
        resp.getWriter().println(id);
    }
}