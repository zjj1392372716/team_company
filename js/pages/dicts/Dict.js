$(function(){
	$('#dictTypeList').tree({
		onClick:function(node){			
			$("#ifame1").attr('src', node.id.split("/")[2]);
		},
	    /*onLoadSuccess : function(node, data) {
		var node1 = $('#dictTypeList').tree('find', "1");
		$('#dictTypeList').tree('select', node1.target);
	}*/
	});
	$("#dictTypeList").tree({   
	   onLoadSuccess:function(node,data){ 
		   $("#ifame1").attr('src', data[0].id.split("/")[2]);
		   $("#dictTypeList li:eq(0)").find("div").addClass("tree-node-selected");  
	   }   
	});  
});