

/**
 * Agent类
 * 1. name: 代理名称
 * 2. performTask(taskType, inputText): 执行任务
 * - 输出任务处理日志
 * - 模拟任务执行时间
 * - 返回任务执行结果
 * */
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
/**
 * Mediator类
 * 负责协调Agent的执行
 * 1. agents: 存储所有注册的agent
 * 2. registerAgent(name, agent): 注册agent
 * 3. execute(agentName, taskType, inputText): 调度指定的agent执行任务
 *  - 从agents对象中查找指定的agent
 *  - 调用agent的performTask方法执行任务
 * */
  class Mediator {
    // 中介者类，负责协调agent的执行
    constructor() {
      this.agents = {};  // 存储所有注册的agent
    }
  
    registerAgent(name, agent) {
      this.agents[name] = agent;  // 将agent存储在agents对象中
    }
  
    async execute(agentName, taskType, inputText) {
      const agent = this.agents[agentName];  // 从agents对象中查找指定的agent
      if (!agent) {
        throw new Error(`Agent '${agentName}' 不存在`);  // 如果agent不存在，抛出错误
      }
      return await agent.performTask(taskType, inputText);  // 调用agent的performTask方法执行任务
    }
  }


// 创建两个Agent实例，分别为AgentA和AgentB，他们之间串行执行任务
const agentA = new Agent('AgentA');
const agentB = new Agent('AgentB');

// 创建Mediator实例并注册Agent
const mediator = new Mediator();
mediator.registerAgent('AgentA', agentA);
mediator.registerAgent('AgentB', agentB);

// 调用Mediator的execute方法，调度AgentA和AgentB执行任务

(async () => {
  // 调用Mediator的execute方法，调度AgentA和AgentB执行任务
  const resultA = await mediator.execute('AgentA', 'taskA', '输入数据A');
  const resultB = await mediator.execute('AgentB', 'taskB', resultA);
  console.log(`最终结果: ${resultB}`);
})();

// 输出：
// AgentA 正在处理任务: taskA，输入: 输入数据A
// AgentA 完成任务: taskA，输出: 输入数据A
// AgentB 正在处理任务: taskB，输入: AgentA 完成任务: taskA，输出: 输入数据A
// AgentB 完成任务: taskB，输出: AgentA 完成任务: taskA，输出: 输入数据A




  
// 创建三个Agent实例，分别为AgentC和AgentD，AgentE。AgentC和AgentD他们之间并行执行任务，最后将结果合并作为输入给AgentE
const agentC = new Agent('AgentC');
const agentD = new Agent('AgentD');
const agentE = new Agent('AgentE');

// 创建Mediator实例并注册Agent
mediator.registerAgent('AgentC', agentC);
mediator.registerAgent('AgentD', agentD);
mediator.registerAgent('AgentE', agentE);

// 调用Mediator的execute方法，调度AgentC和AgentD执行任务
(async () => {
  const resultC = mediator.execute('AgentC', 'taskC', '输入数据C');
  const resultD = mediator.execute('AgentD', 'taskD', '输入数据D');
  const [resultC1, resultD1] = await Promise.all([resultC, resultD]);
  const resultE = await mediator.execute('AgentE', 'taskE', `${resultC1} ${resultD1}`);
  console.log(`最终结果: ${resultE}`);
})();


