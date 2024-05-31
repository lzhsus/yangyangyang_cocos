import { _decorator, Component, Node } from 'cc';
import { Layer1Action } from './Layer1Action';
import { Layer2Action } from './Layer2Action';
import { Layer3Action } from './Layer3Action';
import { GameState } from './GameState';
const { ccclass, property } = _decorator;

@ccclass('LayerRootAction')
export class LayerRootAction extends Component {
    @property({ type:Layer1Action }) 
    layer_1_action:Layer1Action = null;
    @property({ type:Layer2Action }) 
    layer_2_action:Layer2Action = null;
    @property({ type:Layer3Action }) 
    layer_3_action:Layer3Action = null;

    start() {

    }

    update(deltaTime: number) {
        
    }

    start_game(){
        this.layer_1_action.start_game(GameState.cur_lvl);
    }

    clcik_random(){
        this.layer_1_action.random_blocks();
    }
}


