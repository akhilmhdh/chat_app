const expect=require('expect');
const {genMsg}=require('./message.js');

describe('generating Msg',()=>{
    it('should gen msg correctly',()=>{
        let from="admin";
        let text="helooo";
        let msg=genMsg(from,text);
        expect(typeof(msg.createdAt)).toBe('number');
        expect(msg).toMatchObject({from,text});
    });
})