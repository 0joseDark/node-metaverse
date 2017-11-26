// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class AvatarAnimationMessage implements MessageBase
{
    name = 'AvatarAnimation';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyHigh;
    id = Message.AvatarAnimation;

    Sender: {
        ID: UUID;
    };
    AnimationList: {
        AnimID: UUID;
        AnimSequenceID: number;
    }[];
    AnimationSourceList: {
        ObjectID: UUID;
    }[];
    PhysicalAvatarEventList: {
        TypeData: Buffer;
    }[];

    getSize(): number
    {
        return ((20) * this.AnimationList.length) + ((16) * this.AnimationSourceList.length) + ((this.calculateVarVarSize(this.PhysicalAvatarEventList, 'TypeData', 1)) * this.PhysicalAvatarEventList.length) + 19;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.Sender['ID'].writeToBuffer(buf, pos);
        pos += 16;
        let count = this.AnimationList.length;
        buf.writeUInt8(this.AnimationList.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.AnimationList[i]['AnimID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeInt32LE(this.AnimationList[i]['AnimSequenceID'], pos);
            pos += 4;
        }
        count = this.AnimationSourceList.length;
        buf.writeUInt8(this.AnimationSourceList.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.AnimationSourceList[i]['ObjectID'].writeToBuffer(buf, pos);
            pos += 16;
        }
        count = this.PhysicalAvatarEventList.length;
        buf.writeUInt8(this.PhysicalAvatarEventList.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt8(this.PhysicalAvatarEventList[i]['TypeData'].length, pos++);
            this.PhysicalAvatarEventList[i]['TypeData'].copy(buf, pos);
            pos += this.PhysicalAvatarEventList[i]['TypeData'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjSender: {
            ID: UUID
        } = {
            ID: UUID.zero()
        };
        newObjSender['ID'] = new UUID(buf, pos);
        pos += 16;
        this.Sender = newObjSender;
        let count = buf.readUInt8(pos++);
        this.AnimationList = [];
        for (let i = 0; i < count; i++)
        {
            const newObjAnimationList: {
                AnimID: UUID,
                AnimSequenceID: number
            } = {
                AnimID: UUID.zero(),
                AnimSequenceID: 0
            };
            newObjAnimationList['AnimID'] = new UUID(buf, pos);
            pos += 16;
            newObjAnimationList['AnimSequenceID'] = buf.readInt32LE(pos);
            pos += 4;
            this.AnimationList.push(newObjAnimationList);
        }
        count = buf.readUInt8(pos++);
        this.AnimationSourceList = [];
        for (let i = 0; i < count; i++)
        {
            const newObjAnimationSourceList: {
                ObjectID: UUID
            } = {
                ObjectID: UUID.zero()
            };
            newObjAnimationSourceList['ObjectID'] = new UUID(buf, pos);
            pos += 16;
            this.AnimationSourceList.push(newObjAnimationSourceList);
        }
        count = buf.readUInt8(pos++);
        this.PhysicalAvatarEventList = [];
        for (let i = 0; i < count; i++)
        {
            const newObjPhysicalAvatarEventList: {
                TypeData: Buffer
            } = {
                TypeData: Buffer.allocUnsafe(0)
            };
            varLength = buf.readUInt8(pos++);
            newObjPhysicalAvatarEventList['TypeData'] = buf.slice(pos, pos + (varLength - 1));
            pos += varLength;
            this.PhysicalAvatarEventList.push(newObjPhysicalAvatarEventList);
        }
        return pos - startPos;
    }
}

