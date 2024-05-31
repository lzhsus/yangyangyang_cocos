import { _decorator, Component, instantiate, Node, Prefab, SpriteFrame, UITransform, Vec2, Vec3 } from 'cc';
import { PreBlockAction } from './PreBlockAction';
import { GameState } from './GameState';
const { ccclass, property } = _decorator;

@ccclass('Layer1Action')
export class Layer1Action extends Component {

    @property({ type:Prefab })
    per_block:Prefab = null;

    @property({ type:SpriteFrame })
    types_array:SpriteFrame[] = []

    start() {

    }

    update(deltaTime: number) {
        
    }
    // 添加
    add_block_by_world_position(world:Vec3){
        let local = this.node.getComponent(UITransform).convertToNodeSpaceAR(world);
        return this.add_block_by_local_position(local)
    }

    add_block_by_local_position(local:Vec3){
        let block = instantiate(this.per_block);
        block.setPosition(local);
        block.setParent(this.node);
        return block.getComponent(PreBlockAction)
    }
    // 删除
    subtract_block(world:Vec3){
        let local = this.node.getComponent(UITransform).convertToNodeSpaceAR(world);
        for( let i=this.node.children.length-1;i>=0;i-- ){
            if( this.node.children[i].getComponent(PreBlockAction).get_bounding_box().contains(new Vec2(local.x,local.y))){
                this.node.children[i].removeFromParent()
                break;
            }
        }
    }

    // 更新阴影
    refrush_shadow(){
        for( let i=0;i<this.node.children.length;i++ ){
            let ele_1 = this.node.children[i].getComponent(PreBlockAction);
            ele_1.show();

            for( let j=i+1;j<this.node.children.length;j++ ){
                let ele_2 = this.node.children[j].getComponent(PreBlockAction);
                if( ele_1.get_coustom_bounding_box().intersects(ele_2.get_coustom_bounding_box()) ){
                    ele_1.hide()
                    break;
                }
            }
        }
    }
    // 获取子元素
    get_children():Node[]{
        return this.node.children;
    }

    clear_all(){
        this.node.removeAllChildren()
    }

    start_game(lvl:number){
        let lvl_data = GameState.get_data_by_lvl(lvl);
        let types_random_index_arr = this.get_random_index_array(lvl_data.types);
        let current_index = 0;

        for(let index = 0;index<lvl_data.list.length;index++){
            let ele = lvl_data.list[index];
            if( index>0&&index%3==0 ){
                current_index++;
                if( current_index>=types_random_index_arr.length ){
                    current_index = 0;
                }
            }
            let pre_block_action = this.add_block_by_local_position(new Vec3(ele.x,ele.y))
            pre_block_action.init(types_random_index_arr[current_index],this.types_array);
            pre_block_action.refrush_sprite(true)
            
        }
        this.refrush_shadow()
        this.random_blocks();
    }

    get_random_index_array(types:number):number[]{
        let arr:number[] = []
        for(let i=0;i<this.types_array.length;i++){
            arr.push(i)
        }
        arr.sort(()=>{
            return 0.5-Math.random();
        })
        arr.splice(0,arr.length-types);
        return arr;
    }

    random_blocks(){
        let temp:PreBlockAction[] = [];
        for(let ele of this.node.children){
            let action = ele.getComponent(PreBlockAction);
            temp.push(action)
        }
        for (const element of temp) {
            let othen = temp[Math.floor(Math.random()*temp.length)];
            let othen_index = othen.get_sprite_index();

            othen.set_sprite_index(element.get_sprite_index());
            element.set_sprite_index(othen_index);
            othen.refrush_sprite(true);
            element.refrush_sprite(true);
        }
    }
}


