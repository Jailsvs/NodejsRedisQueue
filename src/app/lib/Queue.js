import Queue from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, redisConfig),
    name: job.key,
    handle: job.handle,
    options: job.options,
}));

export default {
    queues,
    add(name, data){
        const queue = this.queues.find(queue => queue.name === name);
        return queue.bull.add(data, queue.options);
    },
    process(){
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);

            queue.bull.on('failed', (job, err) => {
                //Sentry.captureException(err); ou bullBoard yarn add bull-board
                console.log('Job failed', queue.key, job.data);
                console.log(err);
            });
        })
    }
};

/*import RegInsert from '../jobs/RegInsert';
const insertQueue = new Queue(RegInsert.key, redisConfig);

insertQueue.on('failed', (job, err) => {
    console.log('Job failed', job.name, job.data);
    console.log(err);});

export default insertQueue;*/