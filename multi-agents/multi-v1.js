class Agent {
    constructor(name) {
      this.name = name;
    }
  
    async performTask(taskType, inputText) {
      return new Promise((resolve) => {
        console.log(`${this.name} 正在处理任务: ${taskType}，输入: ${inputText}`);
        setTimeout(() => {
          const result = `${this.name} 完成任务: ${taskType}，输出: ${inputText}`;
          console.log(result);
          resolve(result);
        }, 1000);  // 模拟任务执行时间
      });
    }
  }

  
  // 注册两个Agent实例
  const agentA = new Agent('agentA');
  const agentB = new Agent('agentB');
  (async () => {
    const resultA = await agentA.performTask('task1', 'input1');
    const resultB = await agentB.performTask('task2', resultA);
    resultB ;
    console.log(`最终结果: ${resultB}`);
  })();
  