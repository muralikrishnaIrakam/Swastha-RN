import { StyleSheet } from "react-native";


const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDEBEB',
        flex: 1,
        padding: 10,
    },
    containers: {
        backgroundColor: '#DDEBEB',
        flex: 1,
    },
    middle: {
        backgroundColor: '#DDEBEB',
        width: '100%',
        height: '100%',
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusbys: {
        backgroundColor: 'red'
    },
    doctltiFIlterSearchNew: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        gap: 10
    },
    doctltiFIlterSearch: {
        width: '100%',
        marginBottom: 10,
    },
    logoDesign: {
        width: 130,
        height: 130,
        borderRadius: 50,
        borderColor: 'red',
        paddingBottom: 10
    },
    loginwithMob: {
        fontSize: 20,
        color: '#095981',
        fontFamily: 'Poppins-SemiBold'
    },
    txtInot: {
        width: '100%',
        height: 60,
        padding: 10,
        letterSpacing: 5,
        fontSize: 15,
        margin: 10,
        elevation: 1,
        backgroundColor: '#E9E8EE',
        color: '#000',
        borderRadius: 10,
        fontFamily: 'Poppins-Medium'

    },
    teerms: {
        fontSize: 16,
        marginBottom: 20,
        marginTop: 20,
        color: '#000000',
        lineHeight: 20
    },
    tretmr: {
        fontSize: 16,
        color: '#095981',
    },
    txtInotOTP: {
        width: '100%',
        height: 60,
        padding: 10,
        margin: 10,
        textAlign: 'center',
        elevation: 1,
        fontSize: 20,
        backgroundColor: '#E9E8EE',
        color: '#000',
        borderRadius: 10,
        fontFamily: 'Poppins-Medium'

    },
    differentMail: {
        color: '#095981',
        paddingTop: 10,
        fontFamily: 'Poppins-Medium'
    },
    noBookings: {
        textAlign: 'center',
        color: '#095981',
        fontFamily: 'Poppins-Light'
    },
    GetOtpOut: {
        width: '100%',
        height: 50,
        marginTop: 10,
        backgroundColor: '#095981',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    GetOtpLogin: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Caution: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    CautionTxt: {
        color: 'red',
        fontSize: 10,
        padding: 6,
        fontFamily: 'Poppins-Light'
    },
    otpTTxt: {
        color: '#fff',
    },
    otpTTxts: {
        color: '#000',
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
    },
    iconsdd: {
        alignSelf: 'center',

    },
    loginWithGoogleSection: {
        width: '80%',
        height: 50,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginWithOr: {
        width: '80%',
        borderRadius: 10,
        display: 'flex',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    googleIcon: {
        width: 20,
        height: 20,
        paddingRight: 10,
        marginRight: 20
    },
    // Location

    location: {
        backgroundColor: '#EAEAEA',
        elevation: 10,
        width: '100%',
        height: 60,
        borderRadius: 10,
        padding: 10,
        marginBottom: 50
    },
    seachTxt: {
        color: '#000',
        fontSize: 16
    },
    selectLoca: {
        color: '#095981',
        fontFamily: 'Poppins-Regular',
        marginTop: 10
    },
    realTxt: {
        color: '#000',
        fontSize: 20,
        backgroundColor: '#fff',
        padding: 8,
        borderWidth: 1,
        margin: 4,
        paddingBottom: 0,
        borderTopColor: '#095981',
        borderRadius: 3,
        fontFamily: 'Poppins-Light'
    },
    IconsLoca: {
        fontFamily: 'Poppins-Light'
    },

    // Lanfin Page ///

    InnnerSection: {
        backgroundColor: '#095981',
        width: '48%',
        height: 160,
        padding: 1,
        borderRadius: 10,
        margin: 3,
        elevation: 2
    },
    imageSettings: {
        width: '100%',
        height: '100%',
        objectFit: "fill",
        borderRadius: 10,
    },
    videoTxt: {
        position: 'absolute',
        bottom: 0,
        color: '#fff',
        backgroundColor: '#095981',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        width: '100%',
        padding: 4,
        // borderRadius: 10,
    },
    MainvideoTxt: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins-Regular'
    },
    specialTxt: {
        color: '#342342',
        fontSize: 20,
        marginBottom: 20,

    },
    videoTxtDesc: {
        fontSize: 10,
        color: '#fff',
        fontFamily: 'Poppins-Regular'
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 10
    },
    mainWelcome: {
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center'
    },
    searchData: {
        borderRadius: 6,
        marginBottom: 10,
        backgroundColor: '#D0BCFF'
    },
    goodMorning: {
        fontSize: 13,
        color: '#095981',
        fontFamily: 'Poppins-Light'
    },
    badgeView: {
        position: 'relative'
    },
    badGe: {
        position: 'absolute',
        top: -10,
        left: 10,
        zIndex: 99
    },
    goodMorningName: {
        fontSize: 14,
        color: '#095981',
        fontFamily: 'Poppins-Bold'
    },
    mainImg: {
        width: 44,
        height: 44,
        borderRadius: 50,
        backgroundColor: '#fff'
    },
    mainTxsst: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    mainTxt: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    careos: {
        marginTop: 6,
        elevation: 2
    },
    sldierImages: {
        width: 300,
        height: 150,
        borderRadius: 20,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryTxt: {
        fontSize: 18,
        marginTop: 10,
        color: '#2E4A80',
        fontFamily: 'Poppins-Bold'
    },
    categoryTxts: {
        fontSize: 18,
        color: '#2E4A80',
        fontFamily: 'Poppins-Bold'
    },
    feevrIcons: {
        width: '70%',
        height: '70%',
    },
    categoryTxt3eee: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    AllCategosq: {
        marginBottom: 15,

    },
    AllCateItems: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        elevation: 2,
        width: 64,
        height: 60,
        borderRadius: 10,
        gap: 3,
        margin: 4
    },
    AllCateItemsTxt: {
        textAlign: 'center',
        fontSize: 10,
        color: '#000',
        fontFamily: 'Poppins-Regular'
    },



    // Doctors List ///


    closeBtn: {
        margin: 'auto',
        backgroundColor: 'red',
        height: 40
    },
    timingss: {
        color: '#838480',
        fontSize: 14,
        padding: 3,
        borderWidth: .5,
    },
    map: {
        flex: 1,
    },
    textsss: {
        color: '#000',

    },
    descripsss: {
        color: '#838480',
        fontSize: 14,
        padding: 3,
    },
    descripssss: {
        color: '#194BFD',
        fontSize: 14,
        padding: 3,
    },
    cTIming: {
        paddingBottom: 10,
        color: '#095981'
    },
    modelAdd: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 6,
        marginTop: 10,
        padding: 10
    },
    modelAddss: {
        backgroundColor: '#ECF0F6',
        width: '100%',
        borderRadius: 6,
        marginTop: 10,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    },
    startSi: {
        fontSize: 12
    },
    textTra: {
        fontSize: 10,
        paddingLeft: 6,
        position: 'relative',
        bottom: 1
    },
    PriceRange: {
        display: 'flex',
        position: 'relative',
        right: 0
    },
    DocNames: {
        color: '#095981',
    },
    startsBox: {
        height: 'auto',
        flexDirection: 'row',
        display: 'flex',
        padding: 3,
        textAlign: 'center',
        borderRadius: 6,
        width: '80%'
    },
    stars: {
        fontSize: 20,
        color: '#095981',
        textAlign: 'center'
    },
    orthos: {
        fontSize: 10,
        color: '#747374'
    },
    online: {
        width: 15,
        height: 15,
        backgroundColor: 'green',
        borderRadius: 50,
        position: 'absolute',
        right: 0,
        bottom: 0,
        zIndex: 1111
    },
    groupBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    homeText: {
        fontSize: 16,
        color: 'blue',
        fontWeight: 'bold',
    },
    addLove: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row'
    },
    doctorTIme: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,

        width: '100%',
        gap: 10,

    },
    mainDOc: {
        width: 120,
        height: 120,
        borderRadius: 20
    },
    doctorTImes: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 4,
    },
    doctorTImes3: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        zIndex: 999
    },
    bookTNTxt: {
        color: '#fff',
    },
    bookTNTxtss: {
        color: '#095981',
    },
    imgArraow: {
        width: 20,
        height: 20
    },
    docImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    doctrPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        right: 0
    },
    priceSaa: {
        flexDirection: 'row',
        gap: 10
    },
    docName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#095981',
    },
    descrip: {
        fontSize: 10,
        color: '#000',
        fontFamily: 'Poppins-Regular'
    },
    startRat: {
        display: 'flex',
        flexDirection: 'column'
    },
    clinic: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 4,
        color: '#000'
    },
    clinicFee: {
        color: '#000',
        fontFamily: 'Poppins-Regular'
    },
    price: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#095981',
    },
    submitBtn: {
        width: '45%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#095981',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnss: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#095981',
        display: 'flex',
        fontFamily: 'Poppins-Bold',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnw: {
        width: '45%',
        height: 40,
        borderRadius: 10,
        borderCurve: 1,
        borderWidth: 1,
        borderColor: '#095981',
        shadowColor: 'blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtssn: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16
    },
    clinicName: {
        fontSize: 14,
        paddingTop: 5,
        color: '#095981',
        alignItems: 'center',
        alignContent: 'center'
    },
    details: {
        flexDirection: 'row',
        gap: 10
    },
    centeredView: {
        flex: 1,
        width: '100%',
        height: '100%',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        width: '100%',
        height: '100%',
        elevation: 5,
        backgroundColor: '#DDEBEB',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalDoc: {
        flexDirection: 'row',
        gap: 10
    },


    // SLots

    slotDate: {
        color: '#000',
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center'
    },
    slotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    slotTime: {
        borderWidth: 1,
        borderColor: '#095981',
        margin: 5,
        shadowColor: 'blue',
        width: '30%',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center',
        alignItems: 'center',
    },
    slotTimes: {
        color: '#095981',
        fontFamily: 'Poppins-Medium'
    },




    //Checkout page

    doctInfo: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        height: 60,
        width: '100%'
    },
    selected: {
        color: '#000',
        fontFamily: 'Poppins-Regular'
    },
    slotInfo: {
        width: '100%',
        height: 'auto',
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 3,
        padding: 10,
        marginBottom: 10
    },
    timeSlot: {
        backgroundColor: '#E1E6EC',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    },
    docSlot: {
        backgroundColor: '#E1E6EC',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    },
    imgSize: {
        width: '80%',
        height: '80%',
        borderRadius: 10
    },
    imgSize22: {
        width: '40%',
        height: 100,
        objectFit: 'contain',
        display: 'flex',

        justifyContent: 'center',
        borderRadius: 10
    },
    profiles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#095981',
        padding: 20,
        borderRadius: 10,
        marginTop: 40
    },
    profilesML: {
        fontFamily: 'Poppins-Bold',
        margin: 0,
        padding: 0,
        letterSpacing: 5
    },
    slotCOmnine: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10
    },
    timjings: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    extra: {
        fontSize: 10,
        color: '#CCCCCC'
    },
    cliniAddress: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#000'
    },
    decctr: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    message: {
        width: 40,
        height: 40,
        paddingTop: 7
    },
    chatMsf: {
        width: '80%',
        height: '80%',

    },
    reviewsss: {
        color: '#5BC4B4'
    },
    paymentTxt: {
        color: '#4E4D70'
    },
    changeTxt: {
        color: '#2185AE',
        textAlign: 'right'
    },
    TextDEc: {
        color: '#000',
        fontFamily: 'Poppins-Bold',
    },
    paymentView: {
        color: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    },
    couponCode: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#1A5F6D',
        width: '80%',
        padding: 6,
        color: '#000',
        fontFamily: 'Poppins-Regular',
    },
    tota: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    terms: {
        fontSize: 10,
        color: '#000',
        fontFamily: 'Poppins-Light',
    },
    poaymentBtn: {
        color: '#fff',
        fontWeight: 'bold',
        elevation: 3,
        fontSize: 20
    },
    poaymentBtns: {
        color: '#000',
        fontWeight: 'bold',
        elevation: 3,
        fontSize: 16
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        width: '50%'
    },
    submitGr: {
        width: '100%',
        height: 50,
        backgroundColor: '#5DA85D',
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    touchh: {
        width: '100%'
    },
    tota: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    top: {
        width: 20,
        height: 30
    },
    submitGrss: {
        width: '100%',
        height: 50,
        backgroundColor: '#DBE6F7',
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDEBEB', // Semi-transparent background
    },
    modalContent: {
        width: '100%', // Adjust the width as needed
        height: '100%',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        color: '#000',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    diconsLsi: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 10
    },


    // Bookings

    myBookings: {
        width: '100%',
        height: 'auto    ',
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 3,
        elevation: 2
    },
    myBookingsSee: {
        padding: 6
    },
    videoTxtss: {
        color: '#000',
        fontFamily: 'Poppins-Light',
        lineHeight: 14,
        fontSize: 10
    },
    videoTxtss2: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        lineHeight: 14,
        fontSize: 10
    },
    videoGr: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconsise: {
        backgroundColor: '#F0F3F8',
        padding: 6,
        marginRight: 4,
        borderRadius: 10
    },
    servi: {
        fontFamily: 'Poppins-Bold',
    },
    groupList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    patientName: {
        color: '#000'
    },
    groupData: {
        marginTop: 10
    },
    groupDatas: {
        padding: 2,
        backgroundColor: '#2E3235',

    },
    manageBooking: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    manageBookings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    status: {
        color: '#095981',
        fontFamily: 'Poppins-Bold',
    },
    statuss: {
        color: '#EF7464',
        fontFamily: 'Poppins-Bold',
    },
    statuss1: {
        color: '#000',
        fontSize: 10,
        fontFamily: 'Poppins-Regular',
    },
    statuss2: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    },


    // onBordText

    onBordText: {
        color: '#095981',
        fontSize: 26,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
    },
    onBordDec: {
        color: '#095981',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },



    // Lab Tests
    regularTest: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        color: "#095981"
    },
    labCard: {
        width: '48%', // Each card takes almost half of the container width
        height: 'auto',
        borderRadius: 10,
        margin: 3,
        elevation: 2,
        backgroundColor: '#fff'
    },
    labImage: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover'
    },
    labImageOpen: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover'
    },
    profileNamesLb: {
        fontFamily: 'Poppins-Bold',
        color: '#095981'
    },
    included: {
        fontFamily: 'Poppins-Regular',
        color: '#095981',
        fontSize: 16
    },
    includedsss: {
        fontFamily: 'Poppins-Bold',
        color: '#095981',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10
    },
    enterNameTest: {
        backgroundColor: '#E3E3E3',
        padding: 10,
        borderRadius: 10,
        marginBottom: 6,
        elevation: 1,
        color: '#000'
    },
    includedssss: {
        fontFamily: 'Poppins-Bold',
        color: '#095981',
        fontSize: 16,
        marginTop: 10
    },
    searchBox: {
        backgroundColor: '#fff',
        height: 40
    },
    includedMifdd: {
        fontFamily: 'Poppins-Bold',
        color: '#095981',
        fontSize: 16,
        textAlign: 'center'
    },
    labProd: {
        backgroundColor: '#095981',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center'
    },
    feevrIconss: {
        width: 50,
        height: 50
    },
    includedPara: {
        fontFamily: 'Poppins-Regular',
        color: '#000',
        fontSize: 10
    },
    listItemsLab: {
        fontFamily: 'Poppins-Regular',
        color: '#000',
        fontSize: 14
    },
    LapParaSe: {
        marginBottom: 30
    },
    discountsss: {
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        position: 'absolute',
        zIndex: 1,
        padding: 6,
        backgroundColor: 'green',
        borderBottomRightRadius: 4,
    },
    labContent: {
        padding: 10
    },
    textBoxss: {
        backgroundColor: '#fff',
        elevation: 2,
        height: 'auto',
        padding: 10
    },
    whyWeLab: {
        backgroundColor: '#DDEBEB',
        height: "auto",
        marginTop: 20,
        marginBottom: 20

    },
    labTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#095981'
    },
    labTitles: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#000'
    },
    labTContenr: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        color: '#000'
    },
    priceCal: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 6,
        justifyContent: 'space-between',
        width: '100%',
        alignContent: 'center',
        alignItems: 'center'
    },
    labPrice: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        textAlign: 'right',
        color: '#000'
    },
    labPricesss: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        textAlign: 'right',
        color: '#B4B4BE',
        textDecorationLine: 'line-through'
    },
    totalards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    sumitBookBtn: {
        backgroundColor: '#018965',
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    },
    sumitBookBtnTxt: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#fff'
    },
    paymentDOne: {
        color: 'green',
        fontSize: 30,
        marginTop: 40,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    setAlarm: {
        height: 50,
        marginTop: 10,
        width: '45%',
        backgroundColor: '#095981',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    setAlarmGr: {
        height: 50,
        marginTop: 10,
        width: '45%',
        backgroundColor: '#fff',
        borderRadius: 10,
        fontFamily: 'Poppins-Regular',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    getEmail: {
        color: '#000000',
        fontFamily: 'Poppins-Bold',
    },
    setAlarmq: {
        height: 50,
        marginTop: 10,
        width: '100%',
        backgroundColor: '#095981',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alarmData: {
        flexDirection: 'row', // Arrange children horizontally
        justifyContent: 'space-between', // Put space between children,
        marginBottom: 20
    },
    couBox: {
        backgroundColor: '#fff',
        elevation: 2,
        padding: 10,
        borderRadius: 6
    },
    couData: {
        color: '#095981',
        fontFamily: 'Poppins-Bold',
    },
    quetion: {
        color: '#095981',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        textAlign: 'center'
    },
    quetionss: {
        color: '#095981',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
    },
    answer: {
        color: '#000',
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    quetionBox: {
        padding: 10,
        marginBottom: 10, 
    },
    quetionBoxs: {
        padding: 10,
        marginBottom: 10,
        backgroundColor:'#fff',
        borderRadius:2,
        borderBottomWidth:.6,   
    },
    quetionTinme: {
        color:'#000',
        fontSize:10,
        flexDirection:'row',
        textAlign:'right',
        display:'flex',
        right:0
    },
    deleteAll:{
        display:'flex',
        justifyContent:'flex-end',
        flexDirection:'column',
        textAlign:'right',
        right:0
    },
    BookViewd: {
        width: "100px",
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 6,
        marginBottom: 10
    },
    quetionss:{
        fontSize:16,
        fontFamily: 'Poppins-Medium',
        color:'#000'
    },
    quetioneee:{
        fontSize:12,
        fontFamily: 'Poppins-Regular',
        color:'#000'
    },
    BookViewdtitles: {
        color: '#095981',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
    },
    BookViewdtitlesDate: {
        color: '#095981',
        marginBottom: 10,
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        textAlign: 'center',
        margin: 10
    },
    BookViewdDesc: {
        color: '#000',
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
    },
    BookViewdDates: {
        color: '#000',
        fontFamily: 'Poppins-Light',
        fontSize: 10,

    },
    documentss: {
        color: "#095981",
        fontSize: 16,
        fontFamily: 'Poppins-Light',
    },
    chatIntition: {
        width: 150,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#095981",
        borderRadius: 50,
        position: 'absolute',
        bottom: 60,
        right: 10,
        zIndex: 99,
        shadowColor: 'red'
    },
    doctorPro: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        borderBottomWidth: 1,
        borderColor: '#DBDCE2'
    },
    doctNa: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#095981',
        padding: 0,
        margin: 0
    },
    doctorProOne: {
        position: 'absolute',
        right: 0
    },
    doctorProOneF: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1
    },
    dent: {
        padding: 0,
        margin: 0,
        fontSize: 12,
        position: 'relative',
        top: -8,
        color: '#000512',
        fontFamily: 'Poppins-Regular',
    },
    pfImg: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    expSection: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around'
        // borderBottomWidth: 1,
        // borderColor: '#DBDCE2'
    },
    expSectionNew: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#507F90',
        opacity: .5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cicons: {
        textAlign: 'center',
        color: '#000512',
        fontFamily: 'Poppins-Regular',
    },
    patinetT: {
        fontSize: 10,
        textAlign: 'center',
        color: '#000512',
        fontFamily: 'Poppins-Regular',
    },
    textDoct: {
        marginTop: 20
    },
    abtTxt: {
        color: '#095981',
        marginTop: 4,
        fontFamily: 'Poppins-Bold',
    },
    abtTxte: {
        color: '#000512',
        fontFamily: 'Poppins-Regular',
    },
    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#fff",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
        // padding: 10
    },
    profileData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20
    },
    profileNames: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        paddingTop: 10
    },
    profileNumber: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    bookingInfos: {
        width: '100%',
        height: 'auto',
        marginBottom:10,
        gap:10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor:'#1E424F',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    bookingInfossss: {
        width: '100%',
        height: 'auto',
        marginBottom:10,
        gap:10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor:'#1E424F',
        backgroundColor:'#095981',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    bookingInfosss: {
        width: '100%',
        height: 'auto',
        marginBottom:10,
        gap:10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor:'red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    booingCount: {
        color: '#fff',
        fontSize: 16,
        lineHeight:30,
        fontFamily: 'Poppins-Regular',
        textAlign:'center',
        display:'flex',
        justifyContent:'center',
        padding:10
    },
    bookingRange:{
        textAlign:'center',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        marginTop:16
    },
    mainMnys:{
        display:'flex',
        justifyContent:'space-between',
        width:'100%',
        padding:14,
        flexDirection:'row',    
        alignItems:'center'
    },
    textTd:{
        fontSize: 16,
        fontFamily: 'Poppins-Light',
        color: '#000',
    },
    textTds:{
        fontSize: 16,
        fontFamily: 'Poppins-Light',
        color: 'red',
    },
    mainety:{
        display:'flex',
        flexDirection:'row',
        gap:10
    },
    editICons:{
        position:'absolute',
        bottom:4,
        right:0,
        backgroundColor:'#fff',
        borderRadius:50,
        padding:4
    }

})



export default Styles 