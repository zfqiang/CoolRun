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
        bglist : [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        for (let i = 0; i < this.bglist.length; i++){
            let bg = this.bglist[i];
            bg.setPosition( i * 497, 0);

            let run = cc.moveTo((i + 1) * 5, cc.v2(-497, 0));
            let fun = cc.callFunc(this.backMoveEnd, this);
            let seq = cc.sequence(run, fun);

            bg.runAction(seq);
        }

    },

    backMoveEnd(target){
        target.setPosition(497, 0);

        var backMove = cc.moveTo(5 * this.bglist.length, cc.v2(-497, 0));
        var seq = cc.sequence(backMove, cc.callFunc(this.backMoveEnd, this));

        target.runAction(seq);

    },
    start () {

    },

    // update (dt) {},
});
