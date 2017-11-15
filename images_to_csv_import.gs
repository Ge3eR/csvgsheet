/* Make by Ge3eR 30.11.2016 */
/* New -> Google App Scripts -> paste this code -> save -> run */ 
var CSV_FILE = "table_linked.csv";
var folderId = '0B1nboc39jaOod3V5RVZZYWl6Uzg'; // change to your own directory

var cells = [ "\"ID\",\"NAME\",\"LINK\"" ];

var allow_extension = [ "jpg", "jpeg", "png", "gif", "svg", "bmp", "webp", "JFIF", "TIFF", "HEIF", "ico", "APNG", "MNG" ];

function get_all_fies_from_folders(parentFolderId)
{
  
  try {
      var files = DriveApp.getFolderById(parentFolderId).getFiles();
      while (files.hasNext())
      {
        var file = files.next();
        var ext = parse_file_name_extension(file.getName()).toUpperCase();
        
        var r = 0;
        allow_extension.forEach(function(item, i){
          if(ext == item.toUpperCase() ) r++;
        });
        
        if(r > 0)
          cells.push( "\"" + parse_id_from_file_name_dot(file.getName()) + "\",\"" + baseName(file.getName()) + "\",\"" + file.getUrl() + "\"");
      }
  } catch(e) { Logger.log(e.toString()); }
    
   try {
     var folders = DriveApp.getFolderById(parentFolderId).getFolders();
     while(folders.hasNext())
     {
       var folder = folders.next();
       
       get_all_fies_from_folders(folder.getId());
     }
   } catch (e) { Logger.log(e.toString()); }
}

function folder_to_csv()
{
  get_all_fies_from_folders(folderId);
  
  DriveApp.createFile(CSV_FILE, cells.join('\n', 3), 'text/csv');
}

function parse_id_from_file_name(name)
{
  var fid = name.split('.');
  if(fid.length > 1)
  {
     fid = fid[fid.length-2].split('_');
     return fid[fid.length-1];
  }
  else return "none";
}

function parse_id_from_file_name_dot(name)
{
  var fid = name.split('.');
  if(fid.length > 1)
  {
     fid = fid[fid.length-2];
     return fid;
  }
  else return "none";
}

function parse_file_name_extension(name)
{
  var fid = name.split('.');
  
  if(fid.length > 1)
  {
    return fid[fid.length-1];
  }
  else return "none";
}

function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}
