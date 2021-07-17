# JQuery游戏项目Simon Game

## Simon Game游戏介绍
* 游戏设置：页面上有标题和4个不同颜色按钮。
* 游戏开始：按下键盘任意一个字母，开始游戏。
* 游戏规则：开始游戏后，4个按钮的其中一个按钮会出现短暂动画闪现效果，此时玩家需要记住这个按钮。接着一一点击上轮点过的按钮，最后点击这个“新增”按钮，如果每个都正确完成这一轮的挑战，即可进入下一 轮。(举例：level1只需点击1个按钮，level2则要先点击level1按钮再点击新增按钮……依此规律，等级为n则需要按闪现顺序正确点击n次才算成功。)
* 游戏结束：按钮点击顺序错误，结束游戏。<br>

	点击[Simon Game](https://milaluu.github.io/Simon-Game/)，参与体验游戏效果。

## 游戏功能及分析
* 逻辑分析：
		○ 游戏前：监测键盘字母是否有被按下；<br>
		○ 游戏时：按下后开始游戏，电脑随机选择按钮，结果录成序列；<br>
		             监测玩家按钮点击，对比随机选择结果，是否正确；<br>
		           （正确——>是否序列个数已经点完——>未完，继续点击<br>
		                                      ——>点完，level升级<br>
		           （错误——>游戏结束）<br>
		○ 游戏后：部分数据清零或者重置，再次按键即可重新开始。<br>
	
* 效果分析
		○ 动画：按钮闪现(随机选择)、按钮阴影(玩家点击)、背景变化(游戏结束)；<br>
		○ 声音：每次按钮闪现、按钮阴影、背景变化时，注意不同按钮颜色不同声音；<br>
		○ 文本：游戏开始和游戏结束是不同标题文本，游戏中及时更新level等级变化；<br><br>


## 具体实现步骤
	
> 步骤一：基本游戏框架搭建<br>
>>（1）HTML：index.html，引入google字体、jQuery库，css文件和js文件，设置一个标题和两行两列四个按钮的布局；<br>
>>（2）CSS：style.css，设置页面背景、居中设计、页边距；标题字体、大小；按钮大小、阴影效果；<br>
>>（3）JS：空白game.js文件。<br><br>
	
> 步骤二：随机数选择颜色，存储随机颜色序列<br>
>>（1）在js文件内，创建一个函数nextSequence(), 设置变量randomNumber并存储0-3的随机数；<br>
>>（2）创建buttonColor数组存储序列["red","blue","green","yellow"]；<br>
>>（3）创建randomChosenColour变量，存储通过随机数选中的buttonColours的颜色；<br>
>>（4）将这个颜色添加到空数组gamePattern中。<br><br>
	
> 步骤三：随机颜色对应button进行动画和声音展示<br>
>> nextSequence()函数中，通过buttonColours找到对应id的button进行一个flash操作，同时播放对应颜色音效。<br><br>
		
> 步骤四：监测被按下的button，存储按键颜色序列<br>
>>（1）button被点击触发函数，在函数内部用变量userChosenColour保存button id；<br>
>>（2）创建空数组userClickedPattern，把userChosenColour添加进数组中。<br><br>
	
> 步骤五：添加音效信息<br>
>>（1）点击一个按钮播放对应颜色的音效，创建playSound函数，输入参数为name；<br>
>>（2）把在nextSequence()函数中的播放音效代码移出到playSound()中；<br>
>>（3）代码重构，将playSound应用到nextSequence函数和按钮click触发函数中。<br><br>
	
> 步骤六：为用户点击添加动画效果<br>
>>（1）创建一个animatePress()函数，currentColour作为输入；<br>
>>（2）利用JQuery把"pressed"类添加到刚刚被点击的按钮上，显示被点击时的阴影效果。<br><br>
	
> 步骤七：开始游戏<br>
>>（1）用Jquery监测键盘是否被按下，第一次按下时调用nextSequence函数；<br>
>>（2）创建变量level并初始化为0；<br>
>>（3）在nextSequence函数中，level自加1，再更新标题文本中的level等级；<br>
	
> 步骤八：检测用户答案和游戏序列的匹配程度<br>
>>（1）创建一个函数checkAnswer()，传入参数为currentLevel；<br>
>>（2）当用户点击按钮之后，传入userClickedPattern中最后一个答案的索引，调用checkAnswer()；<br>
>>（3）在checkAnswer()函数内，使用if 语句来检查userClickedPattern最近输入答案与gamePattern是否一致。完成则console.log("success")进入第(4)步，否则console.log("wrong");<br>
>>（4）如果用户在步骤(3)中得到答案一致，那么用另一个if语句检查他们是否完成了gamePattern序列个数。完成则调用nextSequence()。<br><br>
	
> 步骤九：结束游戏<br>
>>（1）当结果为"wrong"时，播放sounds文件夹中的"wrong.mp3"音效；<br>
>>（2）当结果为"wrong"时，给<body>元素添加一个类"game-over"，200ms后移除类；<br><br>
	
> 步骤十：重新开始游戏<br>
>>（1）创建startOver函数，当结果为"wrong"时，调用startOver()；<br>
>>（2）在函数中重置level、gamePattern和startedflag的值；<br>
>>（3）当结果为"wrong"时，将标题文本改为"Game Over, Press Any Key to Restart"。<br><br>

