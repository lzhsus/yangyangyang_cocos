import { _decorator, Button, Component, director, Node, Sprite } from 'cc';
import { SceneBase } from './SceneBase';
import { GameState } from './GameState';
import { EditAction } from './EditAction';
import { LayerRootAction } from './LayerRootAction';
import { EventDispatcher } from './EventDispatcher';
const { ccclass, property } = _decorator;

@ccclass('MainAction')
export class MainAction extends SceneBase {

    @property({ type:Node })
    eidt_root:Node = null;

    @property({ type:Button })
    btn_redo:Button = null;

    @property({ type:Button })
    btn_remove:Button = null;

    @property({ type:Button })
    btn_random:Button = null;

    start() {
        this.init_bg_sound();

        if( GameState.game_model==0 ){
            this.eidt_root.active = false;
            GameState.cur_lvl = 1;
            this.start_game()

            EventDispatcher.get_target().on(EventDispatcher.REPLAY_GAME,this.replay_game,this)
            EventDispatcher.get_target().on(EventDispatcher.REFRESH_BUTTONS,this.refresh_buttons,this)
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

    replay_game(){
        GameState.cur_lvl = 1;
        this.start_game()
    }

    start_game(){
        GameState.reset_ad_times();

        let layer_root = this.node.getChildByName("layer_root").getComponent(LayerRootAction)
        layer_root.start_game()
    }
    // 下一关
    next_game(){
        GameState.cur_lvl+=1;

        this.start_game()
    }

    refresh_buttons(){
        if( GameState.ad_redo_times<=0 ){
            this.btn_redo.getComponent(Sprite).grayscale = true;
        }else{
            this.btn_redo.getComponent(Sprite).grayscale = false;
        }
        if( GameState.ad_remove_times<=0 ){
            this.btn_remove.getComponent(Sprite).grayscale = true;
        }else{
            this.btn_remove.getComponent(Sprite).grayscale = false;
        }
        if( GameState.ad_random_times<=0 ){
            this.btn_random.getComponent(Sprite).grayscale = true;
        }else{
            this.btn_random.getComponent(Sprite).grayscale = false;
        }
    }
}


