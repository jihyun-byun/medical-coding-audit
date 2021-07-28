function arrayQueueTest(){

  var ss = SpreadsheetApp.openById('***')
  
  var rawSheet = ss.getSheetByName('RAW_DATA');
  var rawData = rawSheet.getDataRange().getDisplayValues();
  
  var targetSheet = ss.getSheetByName('Queue NEW');
  var targetData = targetSheet.getDataRange().getDisplayValues();

  var assignmentSheet = ss.getSheetByName('Assignments')
  var assignmentData = assignmentSheet.getDataRange().getDisplayValues();

  var autoAsgnSheet = ss.getSheetByName('Auto_Assign')
  var autoAsgnData = autoAsgnSheet.getDataRange().getDisplayValues();
  
  //blank array for all rows
  var rawDataArray = [];

  //First for loop for raw data
  for (var i=0; i < rawData.length; i++) 
     {//start i loop
  
      var row = rawData[i]
      if(row[0] == "Appointment ID"){var row = rawData[i].concat(["Cadence", "Comments", "Assignment"])};
      
      var docName = rawData[i][rawData[0].indexOf("Doctor Name")];
      var docGp = rawData[i][rawData[0].indexOf("Doctor Group")];
      var scribe = rawData[i][rawData[0].indexOf("Scribe Email")];
      var apptId = rawData[i][rawData[0].indexOf("Appointment ID")];
      var noteCt = rawData[i][rawData[0].indexOf("Note Count Since Coding Add")];
      var feature = rawData[i][rawData[0].indexOf("Last feature added")];
      var cadence = 0.05;
      var newCadence = '';
      var comment = '';
      
      var apptDateOg = rawData[i][rawData[0].indexOf("Appointment Date")];
      var apptDateStr = apptDateOg.toString(); 
      var apptDateSec = Date.parse(apptDateStr);
      var apptDateDate = new Date(apptDateSec);
      var apptDateFmt = Utilities.formatDate(apptDateDate, "GMT-5", "MM/dd/yyyy");
      
      //blank array for all rows
      var noteInfoAll = [];
      var remainder = noteCt % 20

      //Logger.log()



//Label notes with clinic assignments (revised for chiefs/clinics) 

      for (var c=1; c < autoAsgnData.length; c++) 
            {//start c loop
               var audEmail = autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email")];
               var docAsgnment = autoAsgnData[c][autoAsgnData[0].indexOf("Doctor")];
               var gpAsgn = autoAsgnData[c][autoAsgnData[0].indexOf("Group")];
              
              //if group (raw data) matches group (in auto assign tab)
              if(docGp == gpAsgn){
                
                //make an array of auditors, count how many there are. 
                var allAuditors = [autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 1")], 
                                    autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 2")], 
                                    autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 3")], 
                                    autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 4")],
                                    autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 5")],
                                    autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 6")] 
                                    // autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 7")],
                                    // autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 8")]
                                    ]
                var numAuditors = allAuditors.filter(String).length
                                
                var mult = 20
                
                var rm = (noteCt % mult)
                var rmAud = (noteCt/mult) % numAuditors
                                
                
                if(rm == 0){
                  

                if(numAuditors == 6)
                  {
                       if(rmAud == 0){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 6")])}
                  else if(rmAud == 1){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 5")])}
                  else if(rmAud == 2){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 4")])}
                  else if(rmAud == 3){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 3")])}
                  else if(rmAud == 4){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 2")])}
                  else if(rmAud == 5){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 1")])}
                  }


                else if(numAuditors == 5)
                  {
                       if(rmAud == 0){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 5")])}
                  else if(rmAud == 1){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 4")])}
                  else if(rmAud == 2){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 3")])}
                  else if(rmAud == 3){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 2")])}
                  else if(rmAud == 4){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 1")])}
                  }
                               
                else if(numAuditors == 4)
                  {
                       if(rmAud == 0){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 4")])}
                  else if(rmAud == 1){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 3")])}
                  else if(rmAud == 2){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 2")])}
                  else if(rmAud == 3){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 1")])}
                  }
                
                else if(numAuditors == 3)
                  {
                       if(rmAud == 0){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 3")])}
                  else if(rmAud == 1){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 2")])}
                  else if(rmAud == 2){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 1")])}
                  
                  }

                else if(numAuditors == 2)
                  {
                  if(rmAud == 0){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 2")])}
                  else if(rmAud == 1){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 1")])}
                  }
                
                else if(numAuditors == 1)
                  {
                  if(rmAud == 0){var auditor = (autoAsgnData[c][autoAsgnData[0].indexOf("Auditor Email 1")])}
                  };
                  
                  
                }//end if rm = 0
                                

              }//end if     
              }//end c loop
                



       // Overwrite notes with manual assignments 
       
       for (var b=0; b < assignmentData.length; b++) 
            {//start b loop
                   var assignmentId= assignmentData[b][assignmentData[0].indexOf("Appt. Id")];
                   var assignmentAuditor = assignmentData[b][assignmentData[0].indexOf("Auditor")];
          
               //if assignment HAS NOT BEEN MADE made already, concatenate to the row and break loop
               if (assignmentId == apptId){
                 var auditor = assignmentAuditor;
                 break;
                    }
                                                               
             }//end b loop

            if(auditor == (null || "")){Logger.log(auditor)}





      //Push every 20th note into array

      if (remainder == 0 ){
    
         //array of values to push:   
       rawDataArray.push([apptId, docName, docGp, scribe, apptDateFmt, feature, cadence, newCadence, 
                         noteCt, noteCt, comment, auditor]);
         }



     }//End i for loop
      
           //sort by auditor name, then date, then group
            var rawDataArray = rawDataArray.sort(function (a,b) {

            if (a[11] > b[11]) return  1;
            if (a[11] < b[11]) return -1;

            if (a[4] > b[4]) return  1;
            if (a[4] < b[4]) return -1;

            if (a[2] > b[2]) return  1;
            if (a[2] < b[2]) return -1;
            
            return 0;
            });
          

       //Print into sheet 
       
       var Avals = targetSheet.getRange("A1:A").getValues();
       var Alast = Avals.filter(String).length;
        
       var targetRangeClear = targetSheet.getRange("A2:O");
       targetRangeClear.clear();
  
       var targetRange = targetSheet.getRange(2, 1, rawDataArray.length, rawDataArray[0].length)       
       targetRange.setValues(rawDataArray); 

    }//end fx
     

      


        



