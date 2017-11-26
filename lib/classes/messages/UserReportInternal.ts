// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class UserReportInternalMessage implements MessageBase
{
    name = 'UserReportInternal';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.UserReportInternal;

    ReportData: {
        ReportType: number;
        Category: number;
        ReporterID: UUID;
        ViewerPosition: Vector3;
        AgentPosition: Vector3;
        ScreenshotID: UUID;
        ObjectID: UUID;
        OwnerID: UUID;
        LastOwnerID: UUID;
        CreatorID: UUID;
        RegionID: UUID;
        AbuserID: UUID;
        AbuseRegionName: Buffer;
        AbuseRegionID: UUID;
        Summary: Buffer;
        Details: Buffer;
        VersionString: Buffer;
    };

    getSize(): number
    {
        return (this.ReportData['AbuseRegionName'].length + 1 + this.ReportData['Summary'].length + 1 + this.ReportData['Details'].length + 2 + this.ReportData['VersionString'].length + 1) + 170;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt8(this.ReportData['ReportType'], pos++);
        buf.writeUInt8(this.ReportData['Category'], pos++);
        this.ReportData['ReporterID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ReportData['ViewerPosition'].writeToBuffer(buf, pos, false);
        pos += 12;
        this.ReportData['AgentPosition'].writeToBuffer(buf, pos, false);
        pos += 12;
        this.ReportData['ScreenshotID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ReportData['ObjectID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ReportData['OwnerID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ReportData['LastOwnerID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ReportData['CreatorID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ReportData['RegionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ReportData['AbuserID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.ReportData['AbuseRegionName'].length, pos++);
        this.ReportData['AbuseRegionName'].copy(buf, pos);
        pos += this.ReportData['AbuseRegionName'].length;
        this.ReportData['AbuseRegionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.ReportData['Summary'].length, pos++);
        this.ReportData['Summary'].copy(buf, pos);
        pos += this.ReportData['Summary'].length;
        buf.writeUInt16LE(this.ReportData['Details'].length, pos);
        pos += 2;
        this.ReportData['Details'].copy(buf, pos);
        pos += this.ReportData['Details'].length;
        buf.writeUInt8(this.ReportData['VersionString'].length, pos++);
        this.ReportData['VersionString'].copy(buf, pos);
        pos += this.ReportData['VersionString'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjReportData: {
            ReportType: number,
            Category: number,
            ReporterID: UUID,
            ViewerPosition: Vector3,
            AgentPosition: Vector3,
            ScreenshotID: UUID,
            ObjectID: UUID,
            OwnerID: UUID,
            LastOwnerID: UUID,
            CreatorID: UUID,
            RegionID: UUID,
            AbuserID: UUID,
            AbuseRegionName: Buffer,
            AbuseRegionID: UUID,
            Summary: Buffer,
            Details: Buffer,
            VersionString: Buffer
        } = {
            ReportType: 0,
            Category: 0,
            ReporterID: UUID.zero(),
            ViewerPosition: Vector3.getZero(),
            AgentPosition: Vector3.getZero(),
            ScreenshotID: UUID.zero(),
            ObjectID: UUID.zero(),
            OwnerID: UUID.zero(),
            LastOwnerID: UUID.zero(),
            CreatorID: UUID.zero(),
            RegionID: UUID.zero(),
            AbuserID: UUID.zero(),
            AbuseRegionName: Buffer.allocUnsafe(0),
            AbuseRegionID: UUID.zero(),
            Summary: Buffer.allocUnsafe(0),
            Details: Buffer.allocUnsafe(0),
            VersionString: Buffer.allocUnsafe(0)
        };
        newObjReportData['ReportType'] = buf.readUInt8(pos++);
        newObjReportData['Category'] = buf.readUInt8(pos++);
        newObjReportData['ReporterID'] = new UUID(buf, pos);
        pos += 16;
        newObjReportData['ViewerPosition'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjReportData['AgentPosition'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjReportData['ScreenshotID'] = new UUID(buf, pos);
        pos += 16;
        newObjReportData['ObjectID'] = new UUID(buf, pos);
        pos += 16;
        newObjReportData['OwnerID'] = new UUID(buf, pos);
        pos += 16;
        newObjReportData['LastOwnerID'] = new UUID(buf, pos);
        pos += 16;
        newObjReportData['CreatorID'] = new UUID(buf, pos);
        pos += 16;
        newObjReportData['RegionID'] = new UUID(buf, pos);
        pos += 16;
        newObjReportData['AbuserID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjReportData['AbuseRegionName'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        newObjReportData['AbuseRegionID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjReportData['Summary'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjReportData['Details'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjReportData['VersionString'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        this.ReportData = newObjReportData;
        return pos - startPos;
    }
}

