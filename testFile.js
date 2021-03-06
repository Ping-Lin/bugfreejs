// 
//            /＼＿/＼
//       ／￣／ .   . ＼ ￣￣￣／＼
//     ／   │ミ  ＿  ミ│     ／   ＼
//    ￣￣￣￣Ｕ￣￣￣Ｕ￣￣￣ |＼   ／
//  ／|	                    | ＼／
//    |  authored by Ping  | |
//    |                    |／
//     ￣￣￣￣￣￣￣￣￣￣￣￣
// 
// 

function dealFile(filePath) {

	if(!fs.existsSync(filePath)){
		console.log("file not exist :" + filePath);
	}else{
		fs.readFile(filePath,function(err,data){
			if(err) throw err;

			//add comment prefix
			var commentData = isUtf8(data) ? commentContent_forUTF8 : commentContent;
			var lineArr     = commentData.split("\n");
			lineArr.map(function(line,index){
				lineArr[index] = configItem.prefix + line;
			});
			var currentComment  = new Buffer(lineArr.join("\n") + "\n"); //TODO :cache this result

			process.stdout.write("--> " + filePath + "...");
			var finalResult = buffer.concat([currentComment,data]);
			fs.unlinkSync(filePath);
			fs.writeFileSync(filePath,finalResult)
			process.stdout.write("done\r\n");
		});
	}
}
