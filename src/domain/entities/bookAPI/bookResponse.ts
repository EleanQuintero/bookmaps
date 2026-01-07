
interface Item {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo: SearchInfo;
}

interface AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: Epub;
    pdf: Epub;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
}

interface Epub {
    isAvailable: boolean;
    acsTokenLink?: string;
}

interface SaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice: SaleInfoListPrice;
    retailPrice: SaleInfoListPrice;
    buyLink: string;
    offers: Offer[];
}

interface SaleInfoListPrice {
    amount: number;
    currencyCode: string;
}

interface Offer {
    finskyOfferType: number;
    listPrice: OfferListPrice;
    retailPrice: OfferListPrice;
    giftable: boolean;
}

interface OfferListPrice {
    amountInMicros: number;
    currencyCode: string;
}

interface SearchInfo {
    textSnippet: string;
}

interface VolumeInfo {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: Date;
    description: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount: number;
    printType: string;
    categories: string[];
    averageRating?: number;
    ratingsCount?: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

interface IndustryIdentifier {
    type: string;
    identifier: string;
}

interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
}

interface ReadingModes {
    text: boolean;
    image: boolean;
}
export interface BookAPIRes {
    kind: string;
    totalItems: number;
    items: Item[];
}