/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package fbdatacollector;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author crap
 */
public class DataCollector {

    /**
     * @param args the command line arguments
     */
    String access_token = "CAACEdEose0cBAN1fWZAmbOvxReMG61XZATlnZAPdq2Okr8MnFz4EMcr0OabZAMKZAx48VavDfrOJ9kEumAVrAnRqD8JRVdsz65AZB9VuOC2BdyDEj6GUBJf7IwB7In1Y0FOxbViv29IITQGht8KfXpDj66FZAc0X0q3lKN7FY8qMpShtrNTKHSir7XomWTpTN8ZD";
    String userId="100000059179620";
    Integer limit=5000;
    String baseURL = "https://graph.facebook.com/";
    String friendsDataDir="C:\\Users\\Dell4010\\MP\\Friends_Data\\";
    ArrayList<String> friendIds;
    StringBuilder urlBuilder;
    public static void main(String[] args) {
        try {
            // TODO code application logic here
            new DataCollector().startGathering();
        } catch (IOException ex) {
            Logger.getLogger(DataCollector.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    void startGathering() throws IOException{
        
        File outputFile;
        BufferedWriter writer;
        
        
        
        friendIds = new ArrayList<String>();
        urlBuilder= new StringBuilder();
        
        makeFriendsList(getData("friends",userId));
        
        System.out.println(urlBuilder);
        
        File dirFile= new File(friendsDataDir);
        if(!dirFile.exists())
         dirFile.mkdir();
        int i=1;
        //Collecting likes {All of them}
        for(String friendId : friendIds){
            
                System.out.println("("+(i++)+"|"+friendIds.size()+") ---> DONE");
            try {
                outputFile = new File(friendsDataDir+friendId+".json");
                writer = new BufferedWriter(new FileWriter(outputFile));
                String data = getData("likes",friendId);
                writer.write(data);
                writer.close();
                
            } catch (IOException ex) {
                Logger.getLogger(DataCollector.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
        
        
        
    }
    
    String getData(String field,String uId){
        urlBuilder.delete(0, urlBuilder.length());
        urlBuilder.append(baseURL);
        urlBuilder.append(uId);
        urlBuilder.append("/"+field+"/?");
        urlBuilder.append("limit=").append(limit);
        urlBuilder.append("&access_token=").append(access_token);
        String line;
        StringBuilder data = new StringBuilder();
        HttpClient httpClient = new DefaultHttpClient();
        HttpGet httpGet = new HttpGet(urlBuilder.toString());
        try{
            HttpResponse response = httpClient.execute(httpGet);
            BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            while((line = reader.readLine())!=null){
                data.append(line);
            }
        }catch(ClientProtocolException e){
            e.printStackTrace();
        } catch (IOException ex) {
            Logger.getLogger(DataCollector.class.getName()).log(Level.SEVERE, null, ex);
        }
        
//        System.out.println(urlBuilder);
//        System.out.println(data.toString());
        return data.toString();  
    }
    
    void makeFriendsList(String data){
        try {
            JSONObject mainData = new JSONObject(data.toString());
            JSONArray friendsArray = mainData.getJSONArray("data");
            for(int i =0; i<friendsArray.length();i++){
                friendIds.add(friendsArray.getJSONObject(i).getString("id"));
            }
        } catch (JSONException ex) {
            Logger.getLogger(DataCollector.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    
   
    
}
