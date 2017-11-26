// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ParcelRenameMessage implements MessageBase
{
    name = 'ParcelRename';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.ParcelRename;

    ParcelData: {
        ParcelID: UUID;
        NewName: Buffer;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.ParcelData, 'NewName', 1) + 16) * this.ParcelData.length) + 1;
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
        const count = this.ParcelData.length;
        buf.writeUInt8(this.ParcelData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.ParcelData[i]['ParcelID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.ParcelData[i]['NewName'].length, pos++);
            this.ParcelData[i]['NewName'].copy(buf, pos);
            pos += this.ParcelData[i]['NewName'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const count = buf.readUInt8(pos++);
        this.ParcelData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjParcelData: {
                ParcelID: UUID,
                NewName: Buffer
            } = {
                ParcelID: UUID.zero(),
                NewName: Buffer.allocUnsafe(0)
            };
            newObjParcelData['ParcelID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjParcelData['NewName'] = buf.slice(pos, pos + (varLength - 1));
            pos += varLength;
            this.ParcelData.push(newObjParcelData);
        }
        return pos - startPos;
    }
}

