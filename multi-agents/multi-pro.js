

/**
 * Agent类
 * 1. name: 代理名称
 * 2. performTask(taskType, inputText): 执行任务
 * - 输出任务处理日志
 * - 模拟任务执行时间
 * - 返回任务执行结果
 * 3.添加状态管理和持久化
 * */
class Agent {
    constructor(name) {
      this.name = name;
      this.state = {};  // 存储agent的状态信息
    }
  
    async performTask(taskType, inputText) {
      return new Promise((resolve) => {
        console.log(`${this.name} 正在处理任务: ${taskType}，输入: ${inputText}`);
        setTimeout(() => {
          const result = `${this.name} 完成任务: ${taskType}，输出: ${inputText}`;
          this.state[taskType] = result;  // 更新agent的状态信息
          console.log(result);
          resolve(result);
        }, 1000);  // 模拟任务执行时间
      });
    }

    // 添加getState方法，用于获取agent的状态信息
    getState() {
      return this.state;
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
      this.stateStore = {};  // 用于持久化状态
      this.taskQueue = [];  // 存储任务队列
    }
  
    registerAgent(name, agent) {
      this.agents[name] = agent;  // 将agent存储在agents对象中
    }

    /*  
    * 添加addTaskToQueue方法，用于向任务队列中添加任务
    * @param {string} agentName - agent名称
    * @param {string} taskType - 任务类型
    * @param {string} inputText - 输入数据
    * */
    addTaskToQueue(agentName, taskType, inputText, priority = 0) {
      this.taskQueue.push({ agentName, taskType, inputText, priority  });
      this.taskQueue.sort((a, b) => b.priority - a.priority);  // 按照优先级排序
    }

    // 状态保存和恢复的背景在实际应用中，特别是长时间运行或分布式系统中，可能会遇到系统崩溃、重启等情况。为了避免任务进度丢失，我们需要将代理的状态持久化存储。当系统重启后，可以从持久化存储中恢复任务的状态，继续未完成的任务。
    loadState(agentName) {
      if (!this.stateStore[agentName]) {
        return;  // 如果没有状态信息，直接返回
      }
      console.log(`从持久化存储中恢复 ${agentName} 的状态`);
      console.log(this.stateStore[agentName]);
      this.agents[agentName].state = this.stateStore[agentName];  // 从stateStore中恢复agent的状态
    }



  /**
   * 添加execute方法，用于调度指定的agent执行任务
   * */
    async execute() {
      const taskPromises = [];
      while (this.taskQueue.length > 0) {
        const task = this.taskQueue.shift();  // 从任务队列中取出任务
        const { agentName, taskType, inputText } = task;
        const agent = this.agents[agentName];  // 从agents对象中查找指定的agent
        if (!agent) {
          console.error(`Agent '${agentName}' 不存在`);
          continue;
        }
        taskPromises.push(this._executeTask(agent, taskType, inputText));
      }
      await Promise.all(taskPromises);
    }


    async _executeTask(agent, taskType, inputText) {
      try {
        await agent.performTask(taskType, inputText);
        this.stateStore[agent.name] = agent.getState();
      } catch (error) {
        console.error(error);
      }
    }

    
  }


export { Agent, Mediator };