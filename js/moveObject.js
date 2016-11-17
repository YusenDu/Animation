$.fn.extend({ MoveObject: function (container,controlMap,showArea,ratio,r,flag) {		
	//初始化变量
    var mouseDownPosiX;
    var mouseDownPosiY;
    var InitPositionX;
    var InitPositionY;
	var ua = navigator.userAgent;//判断浏览器

    //大的显示的图片和红框选择的外容器的比例
    var ratio = (ratio == undefined ? 1 : ratio)
	
	//判断是否有参数
	var container = (container == undefined ? "" :container)
    var controlMap = (controlMap == undefined ? "" :controlMap)
    var showArea = (showArea == undefined ? "" :showArea)
    var num = (r == undefined ? 1 :r)
	
	console.log("num="+num)
	//设置可移动区域宽高

	showArea.width(container.width()/ratio/num)
	showArea.height(container.height()/ratio/num)
	
	
	
    var obj = $(this);
    
    if(flag){
    	if(showArea.width()+parseInt(showArea.css("left")) > controlMap.width()||showArea.height()+parseInt(showArea.css("top"))>controlMap.height()){
	    	showArea.css("left",controlMap.width()-showArea.width()-2)
	    	showArea.css("top",controlMap.height()-showArea.height()-2)
		    	if(ua.indexOf("MSIE")>0){   
					container.find(".big_map").css("left", -((controlMap.width()-showArea.width()-2)*ratio*num) + "px").css("top", -(((controlMap.height()-showArea.height()-2)+1)*ratio*num) + "px");	 	                    
			    }else{
					container.find(".big_map").css("left", -((controlMap.width()-showArea.width()-2)*ratio*num) + "px").css("top", -(((controlMap.height()-showArea.height()-2)+2)*ratio*num) + "px");	 	                    
			    }
	    }
    }
    
    //当鼠标点击是执行的函数
    obj.mousedown(function (e) {
        //当鼠标按下时捕获鼠标位置以及对象的当前位置
        
        mouseDownPosiX = e.pageX;
        mouseDownPosiY = e.pageY;
        
        InitPositionX = obj.css("left");
        InitPositionY = obj.css("top");
          
        //鼠标移动时获取鼠标移动距离并且计算出移动相对于父容器移动距离
                	
    	//获取红色框和它父容器的宽度、高度
    	var objWidth = parseInt(obj.width())
    	var objHeight = parseInt(obj.height())
    	
    	var controlMapWidth = parseInt(controlMap.width())
    	var controlMapHeight = parseInt(controlMap.height())
    	
    	//初始化红色框位置
    	var tempX=parseInt(InitPositionX);
        var tempY=parseInt(InitPositionY);  
        $(document).mousemove(function (e) {
        	
        	
            
            if(controlMap == ""){
            	//当红色框外父容器不存在的时候可以随便移动
          		tempX = parseInt(e.pageX) - parseInt(mouseDownPosiX) + parseInt(InitPositionX);
            	tempY = parseInt(e.pageY) - parseInt(mouseDownPosiY) + parseInt(InitPositionY);
            }else{
            	
            	//当其父容器存在时，红色框移动距离只能在其父容器内部
          		tempX = parseInt(e.pageX) - parseInt(mouseDownPosiX) + parseInt(InitPositionX);
        		tempY = parseInt(e.pageY) - parseInt(mouseDownPosiY) + parseInt(InitPositionY);
              	
              	if(tempX > (controlMapWidth-objWidth-2)){
              		tempX = controlMapWidth-objWidth-2;
              	}else if(tempX < 0){
              		tempX = 0;
              	}
              	
              	if(tempY>(controlMapHeight-objHeight-2)){
              		tempY = controlMapHeight-objHeight-2;
              	}else if(tempY < 0){
              		tempY = 0;
              	}
				
            }
            //移动红色框
            obj.css("left", tempX + "px").css("top", tempY + "px");           
            //根据红色框移动距离*比例大小移动大图片显示区域
			if(ua.indexOf("MSIE")>0){   
        		container.find(".big_map").css("left", -(tempX*ratio*num) + "px").css("top", -((tempY+1)*ratio*num) + "px");	 	                    
            }else{
        		container.find(".big_map").css("left", -(tempX*ratio*num) + "px").css("top", -((tempY+2)*ratio*num) + "px");	 	                    
            }

        })
    })   
    //当鼠标弹起时移除nove时间
    $(document).mouseup(function () {
        $(document).unbind("mousemove");
    })
      
    //当鼠标离开元素时移除nove时间
    obj.mouseleave(function () {
        $(document).unbind("mousemove");
        });
    }
});