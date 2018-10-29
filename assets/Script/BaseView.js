// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_Hero :{
            default : null,
            type : cc.Animation
        },
        m_RollBtn : {
            default: null,
            type: cc.Button
        },
        m_Back : [cc.Node],
        m_tree : [cc.Node],
        m_water : [cc.Node],

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        for (var i = 0;i < this.m_Back.length; i++){
            this.m_Back[i].setPosition((i * 497), 0);

            var backMove = cc.moveTo((i + 1) * 5, cc.v2(-497, 0));
            var seq = cc.sequence(backMove, cc.callFunc(this.backMoveEnd, this, 'bg'));

            this.m_Back[i].runAction(seq);
        }

        for (var i = 0;i < this.m_tree.length; i++){
            this.m_tree[i].setPosition((i * 1000), 0);

            var backMove = cc.moveTo((i + 1) * 4, cc.v2(-1000, 0));
            var seq = cc.sequence(backMove, cc.callFunc(this.backMoveEnd, this, 'tree'));

            this.m_tree[i].runAction(seq);
        }

        for (var i = 0;i < this.m_water.length; i++){
            this.m_water[i].setPosition((i * 497), 0);

            var backMove = cc.moveTo((i + 1) * 3, cc.v2(-497, 0));
            var seq = cc.sequence(backMove, cc.callFunc(this.backMoveEnd, this, 'water'));

            this.m_water[i].runAction(seq);
        }

    },

    backMoveEnd(target, data){
        let x = 0;
        let time = 0;
        if(data == 'bg'){
            x = 497;
            time = 10;
        }else if(data == 'tree'){
            x = 1000;
            time = 8;
        }else if(data == 'water'){
            x = 497;
            time = 6;
        }
        target.setPosition(x, 0);

        var backMove = cc.moveTo(time, cc.v2(-x, 0));
        var seq = cc.sequence(backMove, cc.callFunc(this.backMoveEnd, this, data));

        target.runAction(seq);
    },

    start () {
        this.mHeroPlay('Run');
        this.m_RollBtn.node.on(cc.Node.EventType.TOUCH_START, this.toucheStart, this);
        this.m_RollBtn.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.m_RollBtn.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
    },

    toucheStart(){
        if(this.m_Hero.currentClip.name == 'Jump'){
            return true;
        }

        this.mHeroPlay('Roll');
    },
    touchEnd(){
        if(this.m_Hero.currentClip.name == 'Jump'){
            return true;
        }
        this.mHeroPlay('Run');
    },

    // update (dt) {},

    onAnimationChange(target, data){
        if(data == 'Jump' && this.isCanChangeClip(data)){
            var moveUp = cc.moveTo(1, -92, 40).easing(cc.easeCubicActionOut());
            var moveDown = cc.moveTo(1, -92, -50).easing(cc.easeCubicActionIn());
            var callBack = cc.callFunc(this.callBack.bind(this));
            var seq = cc.sequence(moveUp, moveDown, callBack);
            this.m_Hero.node.runAction(seq);
        }
        this.mHeroPlay(data);
    },

    callBack(){
        this.mHeroPlay('Run');
    },

    mHeroPlay(playName){
        console.log(playName);
        console.log(this.isCanChangeClip(playName));
        if(this.isCanChangeClip(playName)){
            if(playName == 'Roll'){
                this.m_Hero.node.setPosition(cc.v2(-92, -58));
            }else if(playName == 'Run'){
                this.m_Hero.node.setPosition(cc.v2(-92, -50));
            }else if(playName == 'Jump'){
                this.m_Hero.node.setPosition(cc.v2(-92, -50));
            }
            this.m_Hero.play(playName);
        }
    },
    isCanChangeClip(playName) {
        if (playName == 'Roll') {
            if (this.m_Hero.currentClip.name == 'Jump') {
                return false;
            } else if (this.m_Hero.currentClip.name == 'Run') {
                return true;
            }
        } else if (playName == 'Jump') {
            if (this.m_Hero.currentClip.name == 'Run') {
                return true;
            } else {
                return false;
            }
        }

        return true;
    }
});
