import { _decorator, Component, Node } from 'cc';
import { EventTarget } from "cc";

const { ccclass, property } = _decorator;

const event_target = new EventTarget()

export class EventDispatcher {
    
    private static data:EventDispatcher;

    public static UPDATE_BLOCK_SIZE = "update_block_size";
    public static TIPS_MSG = "tips_msg";
    
    static get_target():EventTarget{
        if( EventDispatcher.data == null ){
            EventDispatcher.data = new EventDispatcher();
        }
        return EventDispatcher.data.get_event_target()
    }
    
    private get_event_target(): EventTarget {
        return event_target;
    }
}


