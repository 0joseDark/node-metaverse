// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class SystemMessageMessage implements MessageBase
{
    name = 'SystemMessage';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.SystemMessage;

    MethodData: {
        Method: Buffer;
        Invoice: UUID;
        Digest: Buffer;
    };
    ParamList: {
        Parameter: Buffer;
    }[];

    getSize(): number
    {
        return (this.MethodData['Method'].length + 1) + ((this.calculateVarVarSize(this.ParamList, 'Parameter', 1)) * this.ParamList.length) + 49;
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
        buf.writeUInt8(this.MethodData['Method'].length, pos++);
        this.MethodData['Method'].copy(buf, pos);
        pos += this.MethodData['Method'].length;
        this.MethodData['Invoice'].writeToBuffer(buf, pos);
        pos += 16;
        this.MethodData['Digest'].copy(buf, pos);
        pos += 32;
        const count = this.ParamList.length;
        buf.writeUInt8(this.ParamList.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt8(this.ParamList[i]['Parameter'].length, pos++);
            this.ParamList[i]['Parameter'].copy(buf, pos);
            pos += this.ParamList[i]['Parameter'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjMethodData: {
            Method: Buffer,
            Invoice: UUID,
            Digest: Buffer
        } = {
            Method: Buffer.allocUnsafe(0),
            Invoice: UUID.zero(),
            Digest: Buffer.allocUnsafe(0)
        };
        varLength = buf.readUInt8(pos++);
        newObjMethodData['Method'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        newObjMethodData['Invoice'] = new UUID(buf, pos);
        pos += 16;
        newObjMethodData['Digest'] = buf.slice(pos, pos + 32);
        pos += 32;
        this.MethodData = newObjMethodData;
        const count = buf.readUInt8(pos++);
        this.ParamList = [];
        for (let i = 0; i < count; i++)
        {
            const newObjParamList: {
                Parameter: Buffer
            } = {
                Parameter: Buffer.allocUnsafe(0)
            };
            varLength = buf.readUInt8(pos++);
            newObjParamList['Parameter'] = buf.slice(pos, pos + (varLength - 1));
            pos += varLength;
            this.ParamList.push(newObjParamList);
        }
        return pos - startPos;
    }
}

