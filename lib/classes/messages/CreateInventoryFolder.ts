// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class CreateInventoryFolderMessage implements MessageBase
{
    name = 'CreateInventoryFolder';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.CreateInventoryFolder;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    FolderData: {
        FolderID: UUID;
        ParentID: UUID;
        Type: number;
        Name: Buffer;
    };

    getSize(): number
    {
        return (this.FolderData['Name'].length + 1) + 65;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.FolderData['FolderID'].writeToBuffer(buf, pos);
        pos += 16;
        this.FolderData['ParentID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt8(this.FolderData['Type'], pos++);
        buf.writeUInt8(this.FolderData['Name'].length, pos++);
        this.FolderData['Name'].copy(buf, pos);
        pos += this.FolderData['Name'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjFolderData: {
            FolderID: UUID,
            ParentID: UUID,
            Type: number,
            Name: Buffer
        } = {
            FolderID: UUID.zero(),
            ParentID: UUID.zero(),
            Type: 0,
            Name: Buffer.allocUnsafe(0)
        };
        newObjFolderData['FolderID'] = new UUID(buf, pos);
        pos += 16;
        newObjFolderData['ParentID'] = new UUID(buf, pos);
        pos += 16;
        newObjFolderData['Type'] = buf.readInt8(pos++);
        varLength = buf.readUInt8(pos++);
        newObjFolderData['Name'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        this.FolderData = newObjFolderData;
        return pos - startPos;
    }
}

