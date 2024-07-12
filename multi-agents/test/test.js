import { Agent, Mediator } from "../multi-pro.js";

// 创建两个Agent实例，分别为AgentA和AgentB，他们之间串行执行任务
const agentA = new Agent('AgentA');
const agentB = new Agent('AgentB');

// 创建Mediator实例并注册Agent
const mediator = new Mediator();
mediator.registerAgent('AgentA', agentA);
mediator.registerAgent('AgentB', agentB);

mediator.addTaskToQueue('AgentA', 'taskA', '输入数据A');
mediator.addTaskToQueue('AgentB', 'taskB', '输入数据B');



// 调用Mediator的execute方法，调度AgentA和AgentB执行任务

(async () => {
    await mediator.execute();
})();

// 输出：
// AgentA 正在处理任务: taskA，输入: 输入数据A
// AgentA 完成任务: taskA，输出: 输入数据A
// AgentB 正在处理任务: taskB，输入: AgentA 完成任务: taskA，输出: 输入数据A
// AgentB 完成任务: taskB，输出: AgentA 完成任务: taskA，输出: 输入数据A


(async () => {
     // 初次执行
    await mediator.execute();
      // 模拟系统重启后的状态恢复
    mediator.loadState('AgentA');
    mediator.loadState('AgentB');
    
    // 添加新任务并执行
    mediator.addTaskToQueue('AgentA', 'taskC', '输入数据C');
    await mediator.execute();
})();




  


