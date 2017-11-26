// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class SetSimStatusInDatabaseMessage implements MessageBase
{
    name = 'SetSimStatusInDatabase';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.SetSimStatusInDatabase;

    Data: {
        RegionID: UUID;
        HostName: Buffer;
        X: number;
        Y: number;
        PID: number;
        AgentCount: number;
        TimeToLive: number;
        Status: Buffer;
    };

    getSize(): number
    {
        return (this.Data['HostName'].length + 1 + this.Data['Status'].length + 1) + 36;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.Data['RegionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.Data['HostName'].length, pos++);
        this.Data['HostName'].copy(buf, pos);
        pos += this.Data['HostName'].length;
        buf.writeInt32LE(this.Data['X'], pos);
        pos += 4;
        buf.writeInt32LE(this.Data['Y'], pos);
        pos += 4;
        buf.writeInt32LE(this.Data['PID'], pos);
        pos += 4;
        buf.writeInt32LE(this.Data['AgentCount'], pos);
        pos += 4;
        buf.writeInt32LE(this.Data['TimeToLive'], pos);
        pos += 4;
        buf.writeUInt8(this.Data['Status'].length, pos++);
        this.Data['Status'].copy(buf, pos);
        pos += this.Data['Status'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjData: {
            RegionID: UUID,
            HostName: Buffer,
            X: number,
            Y: number,
            PID: number,
            AgentCount: number,
            TimeToLive: number,
            Status: Buffer
        } = {
            RegionID: UUID.zero(),
            HostName: Buffer.allocUnsafe(0),
            X: 0,
            Y: 0,
            PID: 0,
            AgentCount: 0,
            TimeToLive: 0,
            Status: Buffer.allocUnsafe(0)
        };
        newObjData['RegionID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjData['HostName'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        newObjData['X'] = buf.readInt32LE(pos);
        pos += 4;
        newObjData['Y'] = buf.readInt32LE(pos);
        pos += 4;
        newObjData['PID'] = buf.readInt32LE(pos);
        pos += 4;
        newObjData['AgentCount'] = buf.readInt32LE(pos);
        pos += 4;
        newObjData['TimeToLive'] = buf.readInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjData['Status'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        this.Data = newObjData;
        return pos - startPos;
    }
}

