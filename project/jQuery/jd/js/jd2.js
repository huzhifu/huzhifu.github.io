$(function () {
/*
1. 鼠标移入移出切换内容的显示/隐藏
2. 显示/隐藏二级菜单
3. 搜索框功能: 显示关键字列表
4. 点击显示/隐藏更多分享
5. 鼠标移入移出显示/隐藏收货地址
6. 鼠标移入移出切换mini购物车的显示/隐藏
7. 点击切换商品相关信息的显示
8. 滑动小图片
9. 切换显示中等图片
10. 图片放大镜
 */
	hoverItems();
	hoverSecondMenu();
	search();
	showMoreShare();
	hoverAddress();
	hoverMiniCart();
	showProductInfo();
	slideSmallImgs();
	changeMediumImg();
	bigImage();
	
	
	/*
	 *10. 图片放大镜
	 */
	function bigImage () {
		var $mediumImg = $('#mediumImg');
		var $mask = $('#mask');
		var $maskTop = $('#maskTop');
		var $largeImgContainer = $('#largeImgContainer');
		var $loading = $('#loading');
		var $largeImg = $('#largeImg');
		
		$maskTop
			.mouseover(function () {
				//显示
				$mask.show();
				$largeImgContainer.show();
				$loading.show();
				//加载大图
				//images\products\product-s2-m.jpg
				//images\products\product-s2-l.jpg
				var src = $mediumImg.attr('src').replace(/m\.jpg$/, 'l.jpg');
				$largeImg.attr('src', src);
				//alert('---');
				//给$largeImg绑定load监听
				$largeImg.on('load', function () {
					//设置$largeImgContainer的宽高
					$largeImgContainer.width($largeImg.width()/2);
					$largeImgContainer.height($largeImg.height()/2);
					//显示图片
					$largeImg.show();
					//隐藏loading
					$loading.hide();
				});
				
				
			})
			.mousemove(function (ev) {
				//1. 计算出left/top
					//event坐标
				var evX = ev.offsetX;
				var evY = ev.offsetY;
					//mask的宽高
				var maskWidth = $mask.outerWidth();
				var maskHeight = $mask.outerHeight();
					//计算
				var left = evX-maskWidth/2; 
				var top = evY-maskHeight/2;
				
				//maskTop的宽高
				var maskTopWidth = $maskTop.outerWidth();
				var maskTopHeight = $maskTop.outerHeight();
				//限制left  [0, maskTopWidth-maskWidth]
				if(left<0) {
					left = 0;
				} else if(left>maskTopWidth-maskWidth) {
					left = maskTopWidth-maskWidth;
				}
				//限制top [0, maskTopHeight-maskHeight]
				if(top<0) {
					top = 0;
				} else if(top>maskTopHeight-maskHeight) {
					top = maskTopHeight-maskHeight;
				}
				//2. 应用到mask
				$mask.css({
					'left' : left,
					'top' : top
				});
				
				//移动显示大图
				var largeLeft = -left*$largeImg.width()/$mediumImg.width();
				var largeTop = -top*$largeImg.height()/$mediumImg.height();
				$largeImg.css({
					left : largeLeft,
					top : largeTop
				});
				
			})
			.mouseout(function () {
				$mask.hide();
				$largeImgContainer.hide();
				$loading.hide();
				$largeImg.hide();
			});
		
	}
	/*
	 * 9. 切换显示中等图片
	 */
	function changeMediumImg () {
		var $mediumImg = $('#mediumImg');
		var $imgs = $('#icon_list>li>img');
		
		$imgs.mouseover(function () {
			if(this.className!='hoveredThumb') {
				//更新class为hoveredThumb的img
				$imgs.filter('.hoveredThumb').removeClass();
				//更新当的img
				this.className = 'hoveredThumb';
				//更新$mediumImg
					//images\products\product-s2.jpg
					//images\products\product-s2-m.jpg
				var src = this.src.replace(/\.jpg$/, '-m.jpg');
				$mediumImg.attr('src', src);
			}
			
		});
		
	}
	/*
	 * 8. 滑动小图片
	 */
	function slideSmallImgs () {
		var $as = $('#preview>h1>a');
		var $backwardA = $as.first();
		var $forwardA = $as.last();
		var $listUl = $('#icon_list');
		var imgCount = $listUl.children().length;
		
		//初始化
		$listUl.css('width', 62*imgCount);
		if(imgCount>5) {
			//$forwardA.removeClass().addClass("forward");
			//$forwardA.attr('class', 'forward');
			$forwardA[0].className = 'forward';
		}
		
		var moveCount = 0; //向右移动 的次数
		//设置监听
		$backwardA.click(function () {
			if(this.className!='backward_disabled') {
				moveCount--;
				//更新当前的a的class
				if(moveCount==0) {
					this.className = 'backward_disabled';
				}
				//更新右边的a的class
				$forwardA.attr('class', 'forward');
				//更新ul的left
				var left = -62*moveCount;
				$listUl.css('left', left);
			}
			
		});
		$forwardA.click(function () {
			if(this.className!='forward_disabled') {
				moveCount++;
				//更新当前的a的class
				if(moveCount==imgCount-5) {
					this.className = 'forward_disabled';
				}
				//更新左边的a的class
				$backwardA.attr('class', 'backward');
				//更新ul的left
				var left = -62*moveCount;
				$listUl.css('left', left);
			}
		});
		
	}
	
	/*
	 * 7. 点击切换商品相关信息的显示 
	 */
	function showProductInfo () {
		
		var $productDetails = $('#product_info,#product_data,#product_package,#product_comment,#product_saleAfter');
		$('#product_detail>:first>li').click(function () {
			if(this.className!='current') {
				//更新class为current的li
				var index = $(this).siblings('.current').removeClass().index();
				//隐藏对应的详情
				$productDetails.eq(index).hide();
				//更新li
				this.className = 'current';
				//显示对应的详情
				$productDetails.eq($(this).index()).show();
			}
		});
	}
	
	/*
	 * 6. 鼠标移入移出切换mini购物车的显示/隐藏
	 */
	function hoverMiniCart () {
		$('#minicart').hover(function () {
			this.className = 'minicart';
			$(this).children('div').show();
		}, function () {
			this.className = '';
			$(this).children('div').hide();
		});
	}
	
	/*
	 * 5. 鼠标移入移出显示/隐藏收货地址
	 */
	function hoverAddress () {
		$("#store_select")
			.hover(function () {
				$(this).children(':not(:first)').show();
			}, function () {
				$(this).children(':not(:first)').hide();
			})
			.children(":last").click(function () {
				$(this).hide().prev().hide();
				
			})
			.prev().find('li').click(function () {
				if(this.className!='hover') {//点击的不是当前地址
					//将class值为hover移除其class
					$(this).siblings('.hover').removeClass();
					//将当前class设置hover
					this.className = 'hover';
				}
			});
	}
	
	function hoverAddress2 () {
		$("#store_select")
			.hover(function () {
				$(this).children(':not(:first)').show();
			}, function () {
				$(this).children(':not(:first)').hide();
			})
			.find('li').click(function () {
				if(this.className!='hover') {//点击的不是当前地址
					//将class值为hover移除其class
					$(this).siblings('.hover').removeClass();
					//将当前class设置hover
					this.className = 'hover';
				}
			});
		$("#store_select").children(':last').click(function () {
			$(this).hide().prev().hide();
			
		});	
			
	}
	
	/*
	 * 4. 点击显示/隐藏更多分享
	 */
	function showMoreShare () {
		var $sm = $("#shareMore");
		var $div = $sm.parent();
		var $a = $div.children('a:gt(2):not(:last)');
		var $b = $sm.children();
		$sm.click(function () {
			if($b.attr('class')==='backword') {
				$div.css('width', 155);
				$a.hide();
				$b.removeAttr('class');
			} else {
				$div.css('width', 200);
				$a.show();
				//$b.attr('class', 'backword');
				$b.addClass('backword');
			}
		});
	}
	
	/*
	 * 3. 搜索框功能: 显示关键字列表
	 */
	function search () {
		var $sh = $('#search_helper');
		$("#txtSearch")
			.on('keyup focus', function () {
				//条件: 输入框的内容是非空格数据
				if($.trim(this.value)!='') {
					$sh.show();
				}
			})
			.blur(function () {
				$sh.hide();
			});
	}
	
	/*
	 * 1. 鼠标移入移出切换内容的显示/隐藏
	 */
	function hoverItems () {
		$('[name=show_hide]').hover(function () {
			$(this).children('#'+this.id+'_items').show();
		}, function () {
			$(this).children('#'+this.id+'_items').hide();
		});
	}
	
	/*
	 * 2. 显示/隐藏二级菜单
	 */
	function hoverSecondMenu () {
		$('#category_items>div').hover(function () {
			$(this).children('div').show();
		}, function () {
			$(this).children('div').hide();
		});
	}
	
});
