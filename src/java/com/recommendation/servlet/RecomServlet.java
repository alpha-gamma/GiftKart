/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.recommendation.servlet;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.myrrix.common.NotReadyException;
import net.myrrix.online.ServerRecommender;
import org.apache.mahout.cf.taste.common.NoSuchUserException;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;

/**
 *
 * @author crap
 */
@WebServlet(name = "RecomServlet", urlPatterns = {"/getRecommendation"}) 
public class RecomServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       	String data = request.getParameter("data");
        System.out.println(data);
        String dataContents[] = data.split(",");
        String id = dataContents[0];
        System.out.println("Servlet Entered Successfully");
        File ff = new File("/home/crap/Minor/Files");
        System.out.println(ff.isDirectory());
        ServerRecommender recom = new ServerRecommender(ff);
        while(!recom.isReady()){}

        List<RecommendedItem> ll = null;
        for(int i=1;i<dataContents.length;i++){
            recom.setPreference(Long.parseLong(id), Long.parseLong(dataContents[i]));
        }

          try {
                  ll = recom.recommend(Long.parseLong(id), 30);
          } catch (NoSuchUserException e){
              e.printStackTrace();
          }catch(NotReadyException e){
              e.printStackTrace();
          }

        File itemid = new File("/home/crap/Minor/Files/itemName.txt");
        String currentLine;
        StringBuffer buff = new StringBuffer();
        StringBuilder build = new StringBuilder();
        BufferedReader reader = new BufferedReader(new FileReader(itemid));
        ArrayList<String> items = new ArrayList<String>();
        while((currentLine=reader.readLine())!=null){
            String contents[] = currentLine.split(",");
            for(RecommendedItem item:ll){
                    if(String.valueOf(item.getItemID()).equals(contents[0])){
                            build.delete(0, build.length());
                            for(int i=1;i<contents.length;i++){
                                    build.append(contents[i]);
                            }
                            items.add(build.toString());
                    }
            }
        }
        
    String json = new Gson().toJson(items);

    System.out.println(json);
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().write(json);
    }

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
