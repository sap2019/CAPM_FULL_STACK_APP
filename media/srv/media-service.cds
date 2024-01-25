using {Media.db as db} from '../db/data-model';


service MediaService @(path : '/media') {
    entity MediaFile as projection on db.MediaFile;
};