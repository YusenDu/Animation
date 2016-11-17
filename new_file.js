$showArea.mousedown(function(e){
    var position = $(this).position();
    divLeft = parseInt(position.left);
    divTop = parseInt(position.top);
    InitialX = e.pageX;
    InitialY = e.pageY;

    
    $(document).mousemove(function(event){
    	
    	divLeft = event.pageX-InitialX;
    	divTop = event.pageY-InitialY;
    	
    	//判断是否超出父容器
    	if(divLeft >= ($controlMap.width()-$showArea.width())){
    		$showArea.css({
    			"top":divTop+"px"
    		})
    	}else if(divTop >= ($controlMap.height()-$showArea.height())){
    		$showArea.css({
    			"left":divLeft+"px"
    		})
    	}else{
    		$showArea.css({
        		"top":divTop+"px",
        		"left":divLeft+"px"
        	})
    	}
    	
   		console.log("event.pageX:"+event.pageX+"--------"+"event.pageY:"+event.pageY)
   		console.log("InitialX:"+InitialX+"--------"+"InitialY:"+InitialY)
   		console.log("divLeft:"+divLeft+"--------"+"divTop:"+divTop)
                    })
                    
                    
                });
 
                $(document).mouseup(function()
                {	
                    $(document).unbind('mousemove');
});