var ATS_list = [
"SJH", 
"RRH",
"BMA",
"BMS",
"ADH",
"TSG",
"ETC",
"CS5",
"MEZ",
"HRH",
"HRC",
"CS6",
"EPS",
"BRB",
"JES",
"COM",
"GAR",
"WIN",
"DFF",
"ERC",
"TRG",
"HLB",
"HTB",
"HDB",
"GDC",
"FNT",
"PMA",
"NMS",
"CPE",
]


function initialize(){
    var sorted_list = ATS_list.sort();
    var table = document.getElementById("table");
    for(let i = 1; i < sorted_list.length; i++){
        var ATS_name = sorted_list[i-1]
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var a = document.createElement('a');
        var link = document.createTextNode(ATS_name);
        a.appendChild(link);
        a.title = ATS_name;
        a.href = "https://utdirect.utexas.edu/apps/campus/buildings/nlogon/facilities/utm/" + ATS_name.toLowerCase() + "/";
        a.setAttribute('target', "_blank");
        cell1.appendChild(a);
        
        //cell1.innerHTML = ATS_name;
        var cell2 = row.insertCell(1);
        cell2.setAttribute('id',ATS_name+"_avail");
        var cell3 = row.insertCell(2);
        cell3.setAttribute('id',ATS_name+"_status");
        var cell4 = row.insertCell(3);
        cell4.setAttribute('id',ATS_name+"_time");
    }

}

initialize();