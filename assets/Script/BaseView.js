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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

        this.mHeroPlay('Run');
        this.m_RollBtn.node.on(cc.Node.EventType.TOUCH_START, this.toucheStart, this);
        this.m_RollBtn.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.m_RollBtn.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);

    },

    toucheStart(){
        cc.log(this.m_Hero.currentClip.name);
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
        if(data == 'Jump'){
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
        this.m_Hero.play(playName);
        if(playName == 'Roll'){
            this.m_Hero.node.setPosition(cc.p(-92, -58));
        }else if(playName == 'Run'){
            this.m_Hero.node.setPosition(cc.p(-92, -50));
        }else if(playName == 'Jump'){
            this.m_Hero.node.setPosition(cc.p(-92, -50));
        }

    },
});
