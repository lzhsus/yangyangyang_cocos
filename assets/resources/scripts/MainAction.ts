import { _decorator, Component, director, Node } from 'cc';
import { SceneBase } from './SceneBase';
import { GameState } from './GameState';
import { EditAction } from './EditAction';
import { LayerRootAction } from './LayerRootAction';
const { ccclass, property } = _decorator;

@ccclass('MainAction')
export class MainAction extends SceneBase {

    @property({ type:Node })
    eidt_root:Node = null;

    start() {
        this.init_bg_sound();

        if( GameState.game_model==0 ){
            this.eidt_root.active = false;
            GameState.cur_lvl = 1;
            this.start_game()
        }else{
            this.eidt_root.active = true;
            this.eidt_root.getChildByName("edit").getComponent(EditAction).start_grid()
        }
    }

    update(deltaTime: number) {
        
    }

    click_back(){
        this.stop_bg_sound();
        
        director.loadScene("home")
    }

    start_game(){
        let layer_root = this.node.getChildByName("layer_root").getComponent(LayerRootAction)
        layer_root.start_game()
    }
    // 下一关
    next_game(){
        GameState.cur_lvl+=1;

        this.start_game()
    }
}


