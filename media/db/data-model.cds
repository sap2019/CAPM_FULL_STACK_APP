namespace Media.db;

entity MediaFile {
    key id        : Integer;
        @Core.MediaType   : mediaType
        content   : LargeBinary;
        @Core.IsMediaType : true
        mediaType : String;
        fileName  : String;
        url       : String;
};