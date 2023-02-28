import {MediaGroupsModel} from "@/types/db.modal";

export const mapApplicationData = (data: MediaGroupsModel[]): string[] => data.map(item => item.application);
