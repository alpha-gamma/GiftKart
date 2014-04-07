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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author crap
 */
public class MakeCSV {
    
    String friendsDataDir="/home/crap/MP/Friends_Data/";
        String csvDataDir="/home/crap/MP/CSVFiles/";

    
        public static void main(String args[]){
            try {
                new MakeCSV().startMaking();
            } catch (IOException ex) {
                Logger.getLogger(MakeCSV.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
        public void startMaking() throws IOException{
            //Converting to CSV {Filtering process, collecting only TV, Movies}
            StringBuilder sBuilder = new StringBuilder();
            ArrayList<String> likes = new ArrayList<String>();
            String line;

            File csvDirFile = new File(csvDataDir);
            if(!csvDirFile.exists())
                csvDirFile.mkdir();
            File dataDirFile = new File(friendsDataDir);

            File csvUserId = new File(csvDataDir+"csvUserId.csv");
            File csvItemId = new File(csvDataDir+"csvItemId.csv");
            GenericExtFilter filter = new GenericExtFilter(".json");
            if(!csvUserId.exists())
                csvUserId.createNewFile();



            BufferedWriter writer = new BufferedWriter(new FileWriter(csvUserId,true));
            HashMap<String,String> itemNames = new HashMap<String, String>();
            for(File userFile : dataDirFile.listFiles(filter)){
                try {
                    BufferedReader bReader = new BufferedReader(new FileReader(userFile));
                    while((line=bReader.readLine())!=null){
                        sBuilder.append(line);
                    }
                } catch (FileNotFoundException ex) {
                    Logger.getLogger(DataCollector.class.getName()).log(Level.SEVERE, null, ex);
                } catch (IOException ex) {
                    Logger.getLogger(DataCollector.class.getName()).log(Level.SEVERE, null, ex);
                }


                try {
                    JSONObject mainData = new JSONObject(sBuilder.toString());
                    JSONArray dataJson = mainData.getJSONArray("data");
                    likes.removeAll(likes);
                    for(int i=0;i<dataJson.length();i++){
                        JSONObject onelike = dataJson.getJSONObject(i);
                        writer.write(userFile.getName().split("\\.")[0]+","+onelike.getString("id")+"\n");  
                        itemNames.put(onelike.getString("id"), onelike.getString("name"));
                    }

                } catch (JSONException ex) {
                    Logger.getLogger(DataCollector.class.getName()).log(Level.SEVERE, null, ex);
                }

            }
            writer.close();
            if(!csvItemId.exists())
                csvItemId.createNewFile();
            writer =  new BufferedWriter(new FileWriter(csvItemId,true));
            for(Map.Entry<String,String> entry : itemNames.entrySet()){
                writer.write(entry.getKey()+","+entry.getValue()+"\n");
            }
            writer.close();
        }
        
         public class GenericExtFilter implements FilenameFilter {
 
		private String ext;
 
		public GenericExtFilter(String ext) {
			this.ext = ext;
		}
 
		public boolean accept(File dir, String name) {
			return (name.endsWith(ext));
		}
        }
        
}
