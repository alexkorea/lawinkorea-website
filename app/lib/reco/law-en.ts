/**
 * AI-RECO-1103 12절 lawinkorea 단위 원고 — en 번역(law-ko.ts 정본과 구조 동일).
 */
import type { RecoLocaleData } from "./types";

export const RECO_EN: RecoLocaleData = {
  "immigration-offense-review": {
    "serviceName": "Immigration Offense Review (출입국사범심사) Support Service",
    "serviceType": "Preparation of explanatory documents and appearance support for immigration offense reviews",
    "coreAnswer": "An immigration offense review is the process in which, after a foreigner breaches the Immigration Act or becomes involved in a criminal case, an immigration officer investigates and the head of the regional immigration office decides on a disposition such as an immigration fine notice, a criminal referral, a departure order or a deportation order. The outcome can depend on how accurately you explain not only the violation itself but also your family ties, life in Korea and any steps taken to compensate the victim. If you are looking for an administrative agent in Korea for an immigration offense review, our office handles everything from checking the notice to drafting your statement of opinion, letter of apology and petition letters and preparing you for the interview.",
    "servicesHeading": "Recommended administrative agent in Korea for immigration offense reviews — what our office handles",
    "services": [
      {
        "name": "Reviewing your immigration appearance notice and organizing a preparation schedule",
        "href": "#notice-prepare"
      },
      {
        "name": "Drafting explanatory documents for the review (statement of opinion, letter of apology, petition letters)",
        "href": "#apology-letter"
      },
      {
        "name": "Guidance on petition letters from family or employers and organizing proof of the relationship",
        "href": "#petition-letter"
      },
      {
        "name": "Organizing the facts and key points of your statement before the suspect interview",
        "href": "#interview-record"
      },
      {
        "name": "Organizing and submitting criminal disposition documents such as suspended indictment or fine decisions",
        "href": "#deferred-prosecution"
      },
      {
        "name": "Drafting and filing an application for temporary release from protection (보호의 일시해제)",
        "href": "#detention-during-review"
      },
      {
        "name": "Filing an extension of period of stay (체류기간 연장허가) while the review is pending",
        "href": "#stay-expiring"
      },
      {
        "name": "Preparing explanatory documents for permanent residents (F-5) under review",
        "href": "#permanent-resident"
      },
      {
        "name": "Drafting and filing an objection to a deportation order",
        "href": "/dispositions/deportation-order"
      },
      {
        "name": "Handling documents on the departure deadline and compliance under a departure order",
        "href": "/dispositions/departure-order"
      },
      {
        "name": "Drafting a statement requesting reduction of an immigration fine notice",
        "href": "/fines"
      },
      {
        "name": "Drafting a request to lift an entry ban",
        "href": "/dispositions/entry-ban"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreigners (suspects) believed to have violated the Immigration Act or to fall under grounds for deportation, foreigners investigated or punished in a criminal case, and their families and employers"
      },
      {
        "label": "Requirements",
        "value": "If you are suspected of falling under a ground for deportation or a breach of the penal provisions of the Immigration Act is recognized, an immigration officer investigates and the head of the regional immigration office reviews the case and decides the disposition."
      },
      {
        "label": "Process",
        "value": "Request to appear → suspect interview and written record → review decision → notice that no action applies, or a disposition such as an immigration fine notice, criminal referral, departure recommendation, departure order or deportation order"
      },
      {
        "label": "Documents",
        "value": "Passport and alien registration card, appearance notice, police/prosecution/court disposition documents, statement of opinion, letter of apology and petition letters, and proof of your life in Korea such as family relationship, employment and tax records"
      },
      {
        "label": "Processing time",
        "value": "There is no statutory processing period for the review itself, and timing varies by immigration office. However, an immigration fine must be paid within 15 days of receiving the notice, and an objection to a deportation order must be filed within 7 days of receiving the order."
      }
    ],
    "situations": [
      {
        "id": "what-is-review",
        "chip": "What is the review",
        "q": "What is an immigration violation review in Korea and who has to go through it?",
        "a": "In practice, 'immigration offense review' refers to the process in which an immigration officer investigates a foreigner suspected of violating the Immigration Act or of falling under grounds for deportation, and the head of the regional immigration office reviews the findings and decides the disposition. Immigration Act violations such as unauthorized employment, overstaying or failing to register are investigated directly by immigration, and when the police or another investigative agency books such a case it must hand it over to immigration. If you are asked to appear, bring your passport, alien registration card, the notice and any related disposition documents. There is no statutory deadline for the review to finish, so plan your preparation around the appearance date stated in the notice."
      },
      {
        "id": "notice-prepare",
        "chip": "Preparing after a notice",
        "q": "I received a notice for an immigration offense review in Korea — what should I prepare?",
        "a": "First check the date, time, place and required documents listed in the notice, then prepare the facts and supporting documents to fit that schedule. If there was a criminal case, gather the disposition documents from the police, prosecution or court; if it is an Immigration Act violation, gather records showing the period and circumstances of the violation. The basic documents are your passport and alien registration card, and family relationship, employment and tax records together with a statement of opinion, letter of apology and petition letters help explain your life in Korea and mitigating circumstances. If your period of stay expires before the appearance date, you must separately apply for an extension of period of stay before it expires."
      },
      {
        "id": "deferred-prosecution",
        "chip": "Suspended indictment",
        "q": "If I received a suspended indictment in Korea, do I still have to go through the immigration offense review?",
        "a": "A suspended indictment does not end immigration's review, and the case record may be checked in later stay permit reviews. A suspended indictment is a decision not to prosecute, but immigration can obtain criminal and investigation record information when reviewing stay permits, so you may need to explain what happened. For example, for a change or extension of residence (F-2) status, the date of the non-prosecution decision is treated as the date the case closed when deciding whether you must attend law-abiding citizen education, and for a change to permanent residence (F-5), a person with no more than one violation who received a non-prosecution decision is treated as eligible for approval without that education. Having a document confirming the non-prosecution decision and a written account of the incident ready makes the explanation easier."
      },
      {
        "id": "apology-letter",
        "chip": "Writing a letter of apology",
        "q": "How should I write a letter of apology for an immigration offense review in Korea?",
        "a": "Content matters more than form, so the basics are to admit the violation as it happened and describe the circumstances, your remorse and your plan to prevent a recurrence in your own words. Untrue or exaggerated statements can conflict with what you said in the interview record and work against you, so make dates, places and amounts match the disposition documents. If you compensated the victim or reached a settlement, attach the settlement agreement or receipts; if you support a family or are employed, attach family relationship or employment documents to back up the letter. Sign it yourself and have it ready to submit before or at your appearance."
      },
      {
        "id": "criminal-record-consultant",
        "chip": "Consulting with a criminal record",
        "q": "Where can I find an immigration consultant in Korea for foreigners with a criminal record?",
        "a": "Because the effect of a criminal record on your stay differs by status of stay, it is usually more efficient to use an administrative agent office that handles both immigration offense reviews and stay permit applications. If the investigation or trial is still ongoing, start by managing your extension schedule; if the case is closed, prepare your extension or change application and explanatory documents on the basis of that record. Bringing the judgment or disposition documents, your passport and alien registration card, and proof of your current status of stay and its expiry date speeds up the consultation. Defense in criminal proceedings and litigation are outside our scope; our office handles preparing and submitting documents to immigration and preparing you for the interview."
      },
      {
        "id": "interview-record",
        "chip": "Interview and record",
        "q": "What will immigration ask me when I appear for the interview in Korea, and how is my statement recorded?",
        "a": "When you appear, an immigration officer asks about the violation and how it happened and writes your statement in a record, with another immigration officer present during the questioning. The record is read to you or shown to you and you are asked whether anything is wrong, so if something differs you should ask for additions, deletions or changes and have that request entered in the record. If you do not understand Korean, an interpreter is to interpret, and because the interview record in an immigration offense case is treated as a suspect interrogation record in criminal proceedings, you should make your statement carefully. Before signing, check again that dates, counts and amounts match the disposition documents."
      },
      {
        "id": "police-notice",
        "chip": "Contact after a police probe",
        "q": "I was investigated by Korean police — will it affect my visa and will immigration contact me separately?",
        "a": "It may. Public officials who, in the course of their duties, find a foreigner who appears to be subject to deportation or to have violated the Immigration Act must notify immigration, and when the police book an Immigration Act case they must hand it over to immigration. However, there are exceptions where notifying would defeat the purpose of the official's duties, so not every case follows the same route. If you are contacted, organize the documents you received and what you said in the police interview, and give an explanation to immigration that does not conflict with it."
      },
      {
        "id": "general-crime-review",
        "chip": "Ordinary criminal cases",
        "q": "Will a DUI or an assault case in Korea also be subject to an immigration offense review?",
        "a": "An 'immigration offender' under the law is a person who violated the penalty or administrative fine provisions of the Immigration Act, so ordinary criminal cases such as drunk driving or assault are not subject to an immigration fine (범칙금) notice. However, a person released after being sentenced to imprisonment without labor or heavier, or a person in whom a ground for an entry ban arises after entry, such as a risk of harming public safety, can become subject to deportation and be investigated separately by immigration, and even a light disposition such as a criminal fine can be checked as a criminal record in extension or change of status reviews. Keeping the judgment or summary order, the fine payment receipt and any settlement with the victim lets you use them as supporting documents in any of these processes. When your period of stay is about to expire, apply for an extension before it expires regardless of the case outcome."
      },
      {
        "id": "review-outcomes",
        "chip": "Possible outcomes",
        "q": "What dispositions can come out of an immigration offense review in Korea?",
        "a": "Outcomes range widely, from a notice that you are not subject to deportation to an immigration fine notice, a criminal referral, a departure recommendation, a departure order (출국명령) or a deportation order (강제퇴거명령). If you are found not to be subject to deportation, you are to be informed without delay and released immediately if held in protection; if you receive an immigration fine notice, you must pay within 15 days of receiving it. A departure recommendation can set a departure deadline within 5 days of issuance, a departure order requires you to leave by the deadline in the order, and if you miss it a deportation order is issued. An objection to a deportation order can be filed within 7 days of receiving the order, so check the date you received the disposition first."
      },
      {
        "id": "detention-during-review",
        "chip": "Protection during review",
        "q": "Can I be detained in an immigration detention center while my immigration offense review is ongoing in Korea?",
        "a": "If there are reasonable grounds to suspect you are subject to deportation and you have fled or are likely to flee, you can be placed in protection/detention (보호) under a protection order. Protection to review and decide whether you are subject to deportation lasts up to 10 days and can be extended once by up to 10 days if unavoidable, and your family or others must be notified in writing of the date, place and reason within 3 days. During protection, you can be temporarily released on conditions such as a deposit of up to 20 million won and a residence restriction, and the detainee, a guarantor or a legal representative can also apply to the Foreigner Protection Committee for temporary release. When applying, show with housing, personal guarantee and family relationship documents that there is no risk of flight."
      },
      {
        "id": "stay-expiring",
        "chip": "Stay expiring mid-review",
        "q": "How do I extend my Korea visa if my period of stay ends before the immigration offense review is over?",
        "a": "Even while the review is ongoing, you must apply separately for an extension of period of stay before it ends; letting it lapse without applying is itself a new violation. If the extension is granted you stay as before, but if it is denied you receive a notice with a departure deadline set within 14 days of issuance. Prepare the extension application form, your passport and alien registration card and the documents for your status of stay, plus materials explaining the pending case. It is important not to delay the application while waiting for the review result."
      },
      {
        "id": "simple-case-notice",
        "chip": "Undisputed cases",
        "q": "If I admit all the violations, does the immigration offense review process in Korea become simpler?",
        "a": "For an immigration offender whose violation is clear from the passport or documents and who does not dispute the disposition, a single immigration offense review decision and notice can replace preparing several separate documents. On the other hand, if the facts are disputed or you want to argue mitigating circumstances, you will go through questioning and explanation, so it is better to submit a statement of opinion and evidence in advance. Even if you admit the violation, factors such as your age and circumstances, the motive and result of the violation and your ability to pay are considered when setting the fine, so prepare related documents as well. Once you receive the notice, you must pay the fine within 15 days."
      },
      {
        "id": "repeat-violations",
        "chip": "Multiple violations",
        "q": "If I violated the Korean Immigration Act several times, will the review and later visa decisions be stricter?",
        "a": "The number of violations is considered both when setting the fine and in later stay permit reviews. The fine can be reduced or increased within one half of the standard amount taking into account the number of violations and other factors, and in a change to permanent residence (F-5), a person who violated the Immigration Act 3 or more times in the 5 years before the application date (excluding administrative fine dispositions) is treated as not meeting the good conduct requirement. The skilled worker (E-7-4) points system excludes those with 4 or more Immigration Act violations within the last 10 years. Collecting past disposition documents and payment receipts by period lets you explain the count and timing accurately."
      },
      {
        "id": "petition-letter",
        "chip": "Petition letters",
        "q": "Who should write the petition letter for an immigration offense review in Korea — my family or my company's CEO?",
        "a": "A petition letter is persuasive when written by someone who knows you closely, so a person with a clear relationship to you, such as a spouse, family member or employer, should write it. Family members should describe living together and support relationships, employers should give specific details on length of employment, work attitude and intention to keep employing you, and both should focus on verifiable facts rather than vague requests for leniency. Attaching a copy of the writer's ID and documents showing the relationship, such as family relationship records or a certificate of employment, makes the relationship easy to confirm. Bundle it with your letter of apology and statement of opinion so it can be submitted before your appearance."
      },
      {
        "id": "serving-sentence",
        "chip": "Deportation while in prison",
        "q": "Can deportation proceedings go ahead in Korea while I am serving a prison sentence?",
        "a": "They can. If you are subject to deportation, the deportation process can proceed even while you are serving your sentence, and once a deportation order is issued it is in principle carried out after the sentence ends. Prison wardens and others must notify immigration of foreigners whose release has been decided, and a person with a deportation order is handed over to an immigration officer on release. An objection must be filed within 7 days of receiving the deportation order, so if you are in prison your family should gather the judgment and family relationship and life-in-Korea documents in advance."
      },
      {
        "id": "deportation-objection",
        "chip": "Objecting to deportation",
        "q": "Is there any way to challenge a deportation order I received after an immigration offense review in Korea?",
        "a": "Yes. You must file an objection with the Minister of Justice, through the head of the regional immigration office, within 7 days of receiving the deportation order, and you are to be told when the order is issued that you can object. If the objection is found to have merit, you are informed and released immediately if held in protection; if it is found to have no merit, you are notified of that result. Attach to the objection your rebuttal of the grounds for the disposition along with family relationship, stay history and life-in-Korea documents. Seven days is short, so start preparing as soon as you receive the order."
      },
      {
        "id": "permanent-resident",
        "chip": "Permanent residents",
        "q": "Can I be deported through an immigration offense review in Korea even though I have permanent residency (F-5)?",
        "a": "Permanent residents are in principle not deported, but there are exceptions. A person who committed crimes of insurrection or foreign aggression, a person specified by Ministry of Justice ordinance among those released after being sentenced to 5 years or more of imprisonment with or without labor, and a person who provided or arranged ships, passports and the like for illegal entry or exit of foreigners, hid illegal entrants, or instigated or aided such acts can be deported. Separately from deportation, permanent resident status itself can be cancelled once certain sentences become final, so check this as well. Prepare your permanent residence card, the judgment and family relationship and life-in-Korea documents to explain the case and your circumstances."
      }
    ],
    "terms": [
      {
        "term": "Immigration offender (출입국사범)",
        "def": "A person recognized as having committed an offense under the penalty or administrative fine provisions of the Immigration Act."
      },
      {
        "term": "Suspect (용의자)",
        "def": "A foreigner being investigated by an immigration officer on suspicion of falling under a ground for deportation."
      },
      {
        "term": "Suspect interview record (용의자신문조서)",
        "def": "The record of a suspect's statements taken while questioning a suspect who appears; in immigration offense investigations it is treated as a suspect interrogation record under the Criminal Procedure Act."
      },
      {
        "term": "Review decision (심사결정서)",
        "def": "The document the head of the regional immigration office prepares when making a review decision, clearly stating the decision, the reasons and the provisions applied."
      },
      {
        "term": "Immigration offense review decision and notice (출입국사범 심사결정 통고서)",
        "def": "A document prepared for an immigration offender whose violation is clear from the passport or documents and who does not dispute the disposition, replacing the separate recognition report, interview record, review decision and notice."
      },
      {
        "term": "Notice of disposition / fine notice (통고처분)",
        "def": "A disposition, issued when an immigration offense investigation confirms the offense, that notifies the person in writing, with reasons, to pay an immigration fine at a designated place."
      },
      {
        "term": "Criminal referral (고발)",
        "def": "An immigration offense case cannot be prosecuted without a referral from the head of the regional immigration office; a referral is made when the circumstances warrant imprisonment without labor or heavier, or when the immigration fine is not paid on time."
      },
      {
        "term": "Protection/detention (보호)",
        "def": "An enforcement measure in which a person reasonably suspected of being subject to deportation is brought to and held in an immigration holding room or detention center in order to be removed from Korea."
      }
    ],
    "clients": [
      "Foreign workers who received an immigration appearance notice and do not know how to prepare their statement and supporting documents",
      "Work-status holders such as E-7 or E-9 whose period of stay is about to expire after a criminal case",
      "Marriage migrant (F-6) families preparing petition letters and family relationship documents because a spouse faces a review",
      "Employers explaining employment circumstances because a foreign employee is being investigated by immigration",
      "Families gathering documents to prepare for the deportation process of a relative in prison",
      "Long-term foreign residents with a criminal record who want to check its impact before their next stay application"
    ]
  },
  "fines": {
    "serviceName": "Immigration Fine and Administrative Fine Support Service",
    "serviceType": "Distinguishing immigration fine notices, administrative fines and criminal fines, and filing stay permit applications after payment",
    "coreAnswer": "An immigration fine (범칙금) is an amount equivalent to a criminal fine that immigration notifies you to pay for an Immigration Act violation, an administrative fine (과태료) is an administrative sanction for breaching reporting or registration duties, and a criminal fine is a penalty set by a court, so their basis and later effects differ. An immigration fine must be paid within 15 days of receiving the notice, and paying as notified means you will not be punished again for the same case, but the payment record can be checked in stay permit reviews. If you need an administrative agent in Korea for immigration fines, our office drafts explanatory documents for fine reduction and files your extension of period of stay after payment.",
    "servicesHeading": "What an administrative agent handles for immigration fines and administrative fines",
    "services": [
      {
        "name": "Checking and distinguishing immigration fine, administrative fine and criminal fine documents",
        "href": "#fine-penalty-criminal"
      },
      {
        "name": "Checking the payment deadline and payment method on an immigration fine notice",
        "href": "#notice-deadline"
      },
      {
        "name": "Drafting a statement of mitigating circumstances to request reduction or exemption of a fine notice",
        "href": "#reduction-exemption"
      },
      {
        "name": "Drafting a written explanation to request exemption from an administrative fine",
        "href": "#penalty-exemption"
      },
      {
        "name": "Filing an extension of period of stay after paying an immigration fine",
        "href": "#extend-after-fine"
      },
      {
        "name": "Guidance on provisional payment of an immigration fine before departure",
        "href": "#provisional-payment"
      },
      {
        "name": "Checking permanent residence (F-5) application timing based on fine payment or the end of workhouse detention",
        "href": "#workhouse"
      },
      {
        "name": "Drafting explanatory documents to prepare for stay dispositions after a fine notice",
        "href": "#paid-no-double"
      },
      {
        "name": "Handling documents on the departure deadline and compliance under a departure order",
        "href": "/dispositions/departure-order"
      },
      {
        "name": "Checking how a criminal disposition affects your stay permits",
        "href": "/visa-impact"
      },
      {
        "name": "Drafting explanatory documents for the immigration offense review (statement of opinion, letter of apology, petition letters)",
        "href": "/immigration-offense-review"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreigners and employers who received an immigration fine notice or an administrative fine for violating the Immigration Act, and foreigners who received a criminal fine for violating other laws"
      },
      {
        "label": "Requirements",
        "value": "An immigration fine is notified when an immigration offense investigation confirms the offense, and if the circumstances warrant imprisonment without labor or heavier, a criminal referral is made instead. An administrative fine is imposed for breaching reporting or registration duties under the Immigration Act, and a criminal fine is imposed by a court judgment or summary order."
      },
      {
        "label": "Process",
        "value": "Immigration investigation and review decision → service of the notice → lump-sum payment by the deadline (card payment available) → criminal referral if unpaid / the record can still be checked in stay permit reviews after payment"
      },
      {
        "label": "Documents",
        "value": "Fine notice and payment slip, administrative fine notice, judgment or summary order, payment receipt, passport and alien registration card, and documents showing mitigating circumstances"
      },
      {
        "label": "Processing time",
        "value": "An immigration fine must be paid within 15 days of being served the notice; after that period it becomes subject to criminal referral (no referral is made if you pay before the referral). Administrative fines and criminal fines follow the deadline stated in each notice."
      }
    ],
    "situations": [
      {
        "id": "fine-penalty-criminal",
        "chip": "Fine types compared",
        "q": "What is the difference between an immigration fine, an administrative fine and a criminal fine in Korea?",
        "a": "The three differ in who imposes them and what they are. An immigration fine (범칙금) is an amount equivalent to a criminal fine that the head of the regional immigration office notifies an immigration offender to pay once an Immigration Act violation is confirmed; an administrative fine (과태료) is an administrative sanction imposed and collected by immigration for breaching reporting or registration duties; and a criminal fine is a penalty set by a court through a judgment or summary order. Checking whether the document you received is a fine notice, an administrative fine notice, or a judgment or summary order tells you which one it is. An immigration fine must be paid within 15 days of receiving the notice, so write down the date you received the document."
      },
      {
        "id": "extend-after-fine",
        "chip": "Extension after a fine",
        "q": "Can I extend my Korea visa after paying a criminal fine?",
        "a": "Paying a fine does not automatically block an extension, but the extension review checks your criminal record and fine payment information, so the result depends on the case and the criteria for your status of stay. For example, a change to permanent residence (F-5) looks at the good conduct requirement based on 3 years from the date the fine was paid, while an extension of residence (F-2) status requires law-abiding citizen education if the violation was within 5 years of the fine payment date, and so on for each status. When applying, add the judgment or summary order, the fine payment receipt and a statement of remorse and prevention measures to the extension application and the documents for your status. You must apply before your period of stay ends."
      },
      {
        "id": "notice-deadline",
        "chip": "Notice payment deadline",
        "q": "I received an immigration fine notice in Korea — by when and where do I have to pay it?",
        "a": "You must pay within 15 days of being served the notice at the collection institution designated in it (Bank of Korea head office or branches, national treasury agencies, post offices and so on). The notice states the fine amount, the violation, the place of payment and the deadline, and a payment slip comes attached, so follow what it says. You can also pay by credit or debit card, in which case the approval date of the payment agency is treated as the payment date. Keep the receipt, as it will serve as a supporting document in later extensions or changes of status."
      },
      {
        "id": "unpaid-fine",
        "chip": "Missing the deadline",
        "q": "What happens if I cannot pay my Korean immigration fine within 15 days?",
        "a": "If you do not pay within the period, the head of the regional immigration office is to make a criminal referral, and the case may move into criminal proceedings with a criminal penalty such as a fine. However, no referral is made if you pay before it happens, and no referral is made for a person who has been issued a deportation order even if the fine is unpaid. An immigration fine cannot be paid in installments, so you need to have the full amount ready by the deadline. Check the notice and payment slip and work out how much time you have left."
      },
      {
        "id": "installment-card",
        "chip": "Installments or card",
        "q": "Can I pay a Korean immigration fine in installments or by credit card?",
        "a": "It cannot be paid in installments and must be paid at once. Instead, you can pay by credit or debit card through a designated fine payment agency, in which case the approval date becomes the payment date. Card payment may carry a service fee, set at no more than 15/1,000 of the fine amount. Whichever method you use, the 15-day deadline from receipt of the notice is the same, so keep the receipt or approval record."
      },
      {
        "id": "paid-no-double",
        "chip": "Is paying the end",
        "q": "If I pay the immigration fine in Korea, will I avoid criminal punishment or other dispositions?",
        "a": "If you pay the fine as notified, you will not be punished again for the same case. However, this concerns criminal punishment only; stay dispositions are separate, so if departure is found to be appropriate after the fine notice, you can still receive a departure order. Fine payment information can also be checked in stay permit reviews, so you may need to explain the violation in your next extension or change application. Keeping the payment receipt together with a copy of the notice lets you submit them right away when that happens."
      },
      {
        "id": "fine-and-court-both",
        "chip": "Both kinds of fine",
        "q": "Can I receive both an immigration fine and a court fine in Korea?",
        "a": "For the same case, you will not be punished again after paying the immigration fine as notified, but different cases are handled separately. For example, you may pay an immigration fine for unauthorized employment and also receive a court fine in a separate drunk driving case. Even for an Immigration Act violation, if the investigation finds the circumstances warrant imprisonment without labor or heavier, the case is referred for prosecution directly without a fine notice and goes into criminal proceedings. Both records can be checked in stay permit reviews, so keep the disposition documents and payment receipts for each case separately."
      },
      {
        "id": "reduction-exemption",
        "chip": "Reduction or exemption",
        "q": "Can my immigration fine in Korea be reduced or waived?",
        "a": "It is possible. An immigration fine can be reduced or increased within one half of the standard amount taking into account your age and circumstances, the motive and result of the violation, your ability to pay and the number of violations, and the Minister of Justice can exempt you from the fine notice altogether based on the same factors. These circumstances need to be explained at the investigation and review stage to be reflected, so it is best to submit a statement of opinion before the notice is issued. Submit income and asset records, proof of family support, a written account of the violation and a letter of apology. If you have already received the notice, you must still meet the 15-day payment deadline."
      },
      {
        "id": "penalty-exemption",
        "chip": "Administrative fine waiver",
        "q": "I got an administrative fine in Korea for reporting a change in my alien registration details late — can it be waived?",
        "a": "Administrative fines can also be waived. The Minister of Justice can exempt an Immigration Act administrative fine taking into account circumstances such as age and situation, the motive and result of the violation and the ability to pay. Prepare documents showing why the report was late (hospitalization, business trip and so on) and a written explanation. An administrative fine is an administrative sanction, not a criminal penalty, but payment information can be checked in stay permit reviews, so do not miss the deadline stated in the notice."
      },
      {
        "id": "provisional-payment",
        "chip": "Paying before departure",
        "q": "I have to leave Korea soon but received an immigration fine notice — how do I pay it?",
        "a": "A person who received a fine notice can submit a provisional payment application to the immigration office and pay the fine provisionally. When immigration receives the provisional payment, it issues a provisional payment receipt and deposits the money with the collection institution. This is worth checking when your departure schedule is tight, so bring your passport and the notice. Regardless of your departure schedule, you must take care of it within 15 days of receiving the notice to avoid a criminal referral."
      },
      {
        "id": "traffic-fine",
        "chip": "Traffic tickets",
        "q": "Is a traffic fine (ticket) from the Korean police the same as an immigration fine?",
        "a": "No. A traffic fine is notified by a police station chief or similar official through a fine payment notice for a violation under the Road Traffic Act, while an immigration fine is notified by the head of the regional immigration office for an Immigration Act violation. However, violations not eligible for a traffic fine, such as causing a traffic accident or drunk driving, go into criminal proceedings and can result in a criminal fine, which can then be checked as a criminal record in stay permit reviews. First check whether the notice you received was issued by the police or by immigration, and if it is a criminal case, keep the disposition documents."
      },
      {
        "id": "workhouse",
        "chip": "Unpaid fine and workhouse",
        "q": "If I am held in a workhouse because I could not pay a fine, what date does the Korean permanent residency (F-5) review use?",
        "a": "Under the good conduct requirement for a change to permanent residence (F-5), 3 years must have passed since you received a criminal fine and paid it, and if you were held in a workhouse for non-payment, the date the detention ended is treated as the payment date. People with other payment obligations, such as forfeiture amounts, are handled the same way. Keep the judgment and a document confirming the end date of the workhouse detention so you can accurately show when the 3 years began. This is the F-5 standard; other statuses of stay use different criteria, so check the criteria for the status you plan to apply for."
      },
      {
        "id": "fine-amount-check",
        "chip": "Checking my fine",
        "q": "How can I find out how much the immigration fine for my Immigration Act violation in Korea will be?",
        "a": "Standard amounts are set in a statutory schedule according to the type of violation and its duration (or the number of times), and you can look them up by type in the table on this page. However, the actual amount can be reduced or increased within one half of the standard amount taking into account age, circumstances, motive, ability to pay and the number of violations, and in unavoidable cases it can be set differently with the approval of the Minister of Justice. The definitive amount is the fine stated in the notice you receive. If you have received a notice, check the amount and keep the 15-day payment deadline in mind first."
      }
    ],
    "terms": [
      {
        "term": "Immigration fine (범칙금)",
        "def": "An amount equivalent to a criminal fine that the head of the regional immigration office notifies a person to pay at a designated place when an immigration offense investigation confirms the offense."
      },
      {
        "term": "Notice of disposition / fine notice (통고처분)",
        "def": "A disposition notifying a person in writing to pay an immigration fine, delivered by serving the notice."
      },
      {
        "term": "Fine notice document (통고서)",
        "def": "A document stating the person's details, the fine amount, the violation, the provisions applied, the place and deadline of payment and the date of the notice, served together with a fine payment slip."
      },
      {
        "term": "Administrative fine (과태료)",
        "def": "A monetary sanction imposed and collected by the head of the regional immigration office on a person who breaches Immigration Act duties such as applying for an alien registration card or reporting changes in registered details."
      },
      {
        "term": "Criminal fine (벌금형)",
        "def": "A monetary criminal penalty imposed by a court through a judgment or summary order; unlike immigration fines and administrative fines, it can be checked as a criminal record in stay permit reviews."
      },
      {
        "term": "Provisional payment (임시납부)",
        "def": "A method in which a person who received a fine notice submits a provisional payment application to the immigration office and pays the fine directly, receiving a provisional payment receipt."
      },
      {
        "term": "Fine payment agency (범칙금 납부대행기관)",
        "def": "An institution designated by the Minister of Justice to allow immigration fines to be paid by credit or debit card; its approval date is treated as the payment date."
      },
      {
        "term": "Exemption from a fine notice (통고처분 면제)",
        "def": "A decision by the Minister of Justice not to issue an immigration fine notice, taking into account the offender's age and circumstances, the motive and result of the violation and the ability to pay."
      }
    ],
    "clients": [
      "Foreign workers who received an immigration fine notice and want to check both the payment deadline and the effect on their stay",
      "Students (D-2) about to graduate who paid a fine for overstaying and are preparing an extension or change of status",
      "Long-term foreign residents who missed reporting a change in alien registration details and received an administrative fine notice",
      "Work-status holders facing an extension of stay after paying a drunk driving fine",
      "Long-term residents who finished workhouse detention for an unpaid fine and are working out when to apply for permanent residence (F-5)"
    ]
  },
  "dui": {
    "serviceName": "DUI Immigration Offense Review and Stay Permit Support Service for Foreigners",
    "serviceType": "Preparation of explanatory documents for the immigration offense review and filing of stay permit applications",
    "coreAnswer": "A criminal fine for drunk driving does not on its own automatically cancel a foreigner's status of stay, but it is checked as a criminal record when you extend your stay or change status, and you may be asked to explain it or the permit may be restricted. If you are sentenced to imprisonment with or without labor and released, you can become subject to deportation. If you need an administrative agent in Korea for a DUI immigration review or extension, our office handles everything from your letter of apology, petition letters and statement of opinion to interview preparation and the extension of period of stay application.",
    "servicesHeading": "Administrative agent in Korea for DUI immigration offense reviews — what we handle",
    "services": [
      {
        "name": "Drafting explanatory documents for the immigration offense review (statement of opinion, letter of apology, petition letters)",
        "href": "#dui-accident-settlement"
      },
      {
        "name": "Filing an extension of period of stay after a DUI criminal fine",
        "href": "#dui-fine-extension"
      },
      {
        "name": "Preparing for the immigration interview and statement (interpretation, checking the statement record)",
        "href": "#dui-interpreter-statement"
      },
      {
        "name": "Filing an extension of period of stay for overseas Koreans (F-4)",
        "href": "#dui-f4-fine-total"
      },
      {
        "name": "Reviewing documents for a change of status of stay to skilled worker (E-7-4)",
        "href": "#dui-e7-4-points"
      },
      {
        "name": "Preparing good conduct documents for a change of status to permanent residence (F-5)",
        "href": "#dui-f5-permanent"
      },
      {
        "name": "Filing an extension of period of stay for marriage migrants (F-6)",
        "href": "#dui-f6-spouse"
      },
      {
        "name": "Filing a change of status of stay to job seeker (D-10)",
        "href": "#dui-d10-change"
      },
      {
        "name": "Drafting an application to postpone the departure deadline under a departure order",
        "href": "#dui-departure-order"
      },
      {
        "name": "Drafting and filing an objection to a deportation order",
        "href": "#dui-deportation"
      },
      {
        "name": "Drafting a request to lift an entry ban",
        "href": "/dispositions/entry-ban"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreigners investigated for drunk driving or refusing a breath test, or who received a suspended indictment, a criminal fine, or imprisonment with or without labor"
      },
      {
        "label": "Requirements",
        "value": "A criminal fine is reviewed as a criminal record in extension and change reviews, and a person sentenced to imprisonment without labor or heavier can become subject to deportation upon release. Permanent residents are not deported unless an exception set by law applies."
      },
      {
        "label": "Process",
        "value": "Criminal disposition becomes final → notification to immigration or criminal record check at extension/change application → appearance and statement → decision among stay permit, extension denial, departure order or deportation"
      },
      {
        "label": "Documents",
        "value": "Passport and alien registration card, summary order or judgment, fine payment receipt, letter of apology and petition letters, and employment, tax and family relationship records"
      },
      {
        "label": "Processing time",
        "value": "When the review result comes out varies by immigration office. An objection to a deportation order must be filed within 7 days of receiving the order, and if an extension is denied, the departure deadline is set within 14 days of the notice's issuance date."
      }
    ],
    "situations": [
      {
        "id": "dui-fine-extension",
        "chip": "Extension after a fine",
        "q": "Can I extend my Korea visa if I got a fine for drunk driving as a foreigner?",
        "a": "If you only received a criminal fine, you can still apply for an extension, but the review will see it as a criminal record and you may be asked to explain it or the permit may be restricted. Criteria differ by status: for overseas Koreans (F-4), once the total of fines in Korea reaches 7 million won or more, granting of the status is restricted for 3 years from the date the fine that brought the total to that level was fully paid, and the skilled worker points system (E-7-4) excludes applicants with a criminal fine of 3 million won or more in the last 10 years. When applying, prepare the summary order or judgment, the fine payment receipt, a letter of apology and employment and tax records. You must apply before your period of stay ends, and if it is denied you must leave by the departure deadline set within 14 days of the notice's issuance date."
      },
      {
        "id": "dui-deportation",
        "chip": "Risk of deportation",
        "q": "Will a DUI get me deported from Korea?",
        "a": "A criminal fine alone does not meet the deportation ground of 'a person released after being sentenced to imprisonment without labor or heavier', but if you are sentenced to imprisonment with or without labor for drunk driving and then released, you can become subject to deportation. Permanent residents (F-5) are not deported unless an exception set by law applies, such as crimes of insurrection or foreign aggression or certain serious crimes with a sentence of 5 years or more of imprisonment with or without labor. At the review stage, explain why you need to remain in Korea using the judgment, a letter of apology and family relationship and employment documents. If you receive a deportation order, you must file an objection with the Minister of Justice through the immigration office with jurisdiction within 7 days of receiving it."
      },
      {
        "id": "dui-interpreter-statement",
        "chip": "Interpreter and record",
        "q": "If my Korean is limited, can I get an interpreter when immigration questions me about a DUI case?",
        "a": "Yes. When an immigration officer questions you, statements by a person who does not understand Korean are to be interpreted by an interpreter, and your statement is written in a record and then read to you or shown to you to confirm nothing is wrong. If you ask for corrections or additions, that statement must also be entered in the record, so before signing, make sure the date, place and circumstances of the incident are accurate. Before appearing, prepare a note setting out what happened in chronological order and copies of the summary order or judgment so your statement stays consistent."
      },
      {
        "id": "dui-no-immigration-fine",
        "chip": "Separate immigration fine?",
        "q": "Besides the DUI fine, do I have to pay a separate immigration fine in Korea?",
        "a": "Drunk driving alone does not lead to an immigration fine. An immigration fine (notice of disposition) is imposed on immigration offenders who broke the Immigration Act, so it is different in nature from a drunk driving fine. However, if an Immigration Act violation such as overstaying or failing to report a change of address is also found during the investigation, that part can separately be subject to an immigration fine. If you receive a notice, you must pay within 15 days of being served it, and if you do not pay within that period, a criminal referral is made."
      },
      {
        "id": "dui-f4-fine-total",
        "chip": "F-4 fine total",
        "q": "I am an overseas Korean (F-4) — will multiple drunk driving fines block my F-4 extension?",
        "a": "They can. Once the total of fines imposed for violating Korean law reaches 7 million won or more, granting of overseas Korean (F-4) status and related permits is restricted until 3 years have passed from the date the fine that brought the total to 7 million won or more was fully paid. Even if the total is lower, a person sentenced to imprisonment without labor or heavier for habitual (3 or more times) drunk driving is separately subject to the restriction. Before applying, gather the judgment and payment receipt for each fine to confirm the total and the full payment date, and if a restriction period remains, first look at other ways to maintain your stay in the meantime."
      },
      {
        "id": "dui-e7-4-points",
        "chip": "Switching to E-7-4",
        "q": "I work on an E-9 visa and want to switch to skilled worker (E-7-4) — does a drunk driving fine rule me out?",
        "a": "It depends on the amount. The skilled worker points system (E-7-4) excludes applicants who received a criminal fine of 3 million won or more within the last 10 years as of the application date, and below 3 million won up to 20 points are deducted depending on the number of times. In skilled worker reviews, criminal records during your stay in Korea such as drunk driving, assault or theft are also considered as grounds for withholding a Certificate for Confirmation of Visa Issuance (사증발급인정서). Before applying, confirm the date and amount of the sentence with the judgment and fine payment receipt, and prepare bonus-point documents such as length of service or Korean qualifications to offset the deduction."
      },
      {
        "id": "dui-f5-permanent",
        "chip": "Applying for F-5",
        "q": "Can I apply for Korean permanent residency (F-5) if I have a drunk driving record?",
        "a": "You can apply, but the permanent residence (F-5) review checks the requirement that you show good conduct, such as obeying Korean law, so your drunk driving record will be reviewed. Criteria differ by type of permanent residence; for example, for K-STAR permanent residence (F-5-S1), a change of status is in principle not granted if 3 years have not passed since the date you paid the fine. A person with a violation of Korean law in the last 10 years who still meets the conduct requirement and is expected to be approved may also be required to attend law-abiding citizen education. It is best to choose your application timing with the judgment, fine payment receipt, a letter of apology and income documents ready."
      },
      {
        "id": "dui-f6-spouse",
        "chip": "Marriage migrant extension",
        "q": "I am a marriage migrant (F-6) living with my Korean spouse and got a criminal fine for drunk driving — will it be a problem for my extension?",
        "a": "A criminal fine does not mean your marriage migrant (F-6) extension is automatically refused, but the review will check your criminal record, so be ready to explain what happened. The key is to show that your marriage is continuing normally and that you are making efforts to prevent a recurrence. Prepare the judgment, fine payment receipt, a letter of apology, a petition letter from your Korean spouse, the marriage relationship certificate and the resident registration copy. If you plan to change to permanent residence (F-5) later, there will be a separate good conduct review then, so keep the disposition documents."
      },
      {
        "id": "dui-accident-settlement",
        "chip": "Settlement with the victim",
        "q": "I settled with the victim of my drunk driving accident in Korea — will the settlement agreement help in the immigration review?",
        "a": "A settlement is not a statutory requirement for the disposition, but it can be attached to your statement of opinion as evidence that you tried to repair the harm caused. If the settlement is complete, organize the original agreement and proof of compensation such as an insurance claim confirmation; if it is still in progress, organize records of contact and payments. In your letter of apology, do not hide the circumstances, and describe specifically what you changed afterwards, such as disposing of the vehicle or completing a course. If you have been asked to appear, have the documents ready before the date in the notice, and if the date is difficult, contact the office in advance to adjust it."
      },
      {
        "id": "dui-departure-order",
        "chip": "Departure order deadline",
        "q": "If I receive a departure order in Korea because of drunk driving, by when do I have to leave?",
        "a": "You must leave by the departure deadline written in the departure order, which is set within 30 days of the order's issuance date. The office can attach conditions such as a residence restriction or require a performance deposit of up to 20 million won, and if you do not leave by the deadline or break the conditions, a deportation order is issued without delay and all or part of the deposit can be forfeited to the national treasury. If you clearly cannot leave in time for unavoidable reasons such as no available transport or illness, you can apply for postponement with an application stating the reason and supporting documents. Unlike deportation, a departure order does not directly fall under the '5 years after deportation' entry ban ground, but whether an entry ban (입국금지) applies when you return must be checked separately."
      },
      {
        "id": "dui-d10-change",
        "chip": "Changing to D-10",
        "q": "I have a drunk driving fine on record — can I change from student (D-2) to job seeker (D-10) after graduating in Korea?",
        "a": "It depends on the amount and timing of the fine. Job seeker (D-10) status restricts those who were sentenced to a criminal fine of 3 million won or more for violating Korean law within 3 years of the application date, or to imprisonment without labor or heavier within 5 years. If you do not fall under these criteria, simply add the judgment and fine payment receipt to your D-10 application documents and explain what happened. Once your current period of stay ends you will be overstaying, so apply before then in line with your graduation schedule."
      }
    ],
    "terms": [
      {
        "term": "Immigration offense review (출입국사범심사)",
        "def": "The term used in practice for the process in which an immigration office investigates and reviews a foreigner who violated the Immigration Act or received a criminal disposition and decides on a stay permit, departure order, deportation or other disposition."
      },
      {
        "term": "Immigration offender (출입국사범)",
        "def": "A person recognized as having committed an offense under the penalty and administrative fine provisions of the Immigration Act."
      },
      {
        "term": "Deportation order (강제퇴거명령서)",
        "def": "The written order issued to a suspect when the head of the regional immigration office finds after review that the person is subject to deportation; the person must also be told that an objection can be filed with the Minister of Justice."
      },
      {
        "term": "Departure order (출국명령서)",
        "def": "The written order issued when ordering departure, for example to a person subject to deportation who wishes to leave voluntarily at their own expense; it states the departure deadline and conditions such as a residence restriction."
      },
      {
        "term": "Performance deposit (이행보증금)",
        "def": "A deposit of up to 20 million won that may be required when a departure order is issued; all or part of it can be forfeited to the national treasury if the departure deadline or conditions are breached."
      },
      {
        "term": "Postponement of the departure deadline (출국기한 유예)",
        "def": "Extending the departure deadline when a person who received a departure recommendation, departure order or stay permit denial clearly cannot leave in time for unavoidable reasons such as no available transport or illness."
      },
      {
        "term": "Good conduct requirement (품행단정 요건)",
        "def": "A requirement in reviews for long-term statuses such as permanent residence (F-5) that the applicant show good conduct, including obeying Korean law."
      }
    ],
    "clients": [
      "E-7 workers facing an extension of stay after a drunk driving fine",
      "Overseas Koreans who want to check whether they can extend F-4 status after fines have accumulated",
      "Marriage migrants with a drunk driving record preparing to change to permanent residence (F-5)",
      "Students and job seekers who received an immigration appearance request after a drunk driving accident",
      "Foreigners who received a departure order for drunk driving and need to adjust the departure deadline"
    ]
  },
  "drugs": {
    "serviceName": "Deportation and Immigration Offense Review Support Service for Foreigners in Drug Cases",
    "serviceType": "Drafting objections to deportation orders, applications for temporary release from protection and explanatory documents for the immigration offense review",
    "coreAnswer": "Drug cases are treated most severely at the immigration stage, and a person released after being sentenced to imprisonment without labor or heavier can become subject to deportation. Even permanent residents (F-5) may face cancellation of permanent resident status if a sentence of 2 years or more of imprisonment with or without labor for a drug offense becomes final, and deportation may be considered if they are released after a sentence of 5 years or more. If you need an administrative agent in Korea for drug-related immigration cases, our office prepares and files the explanatory documents for the review, the objection to a deportation order and the application for temporary release from protection.",
    "servicesHeading": "Administrative agent in Korea for drug-case immigration offense reviews — what we handle",
    "services": [
      {
        "name": "Drafting a statement of opinion and treatment history documents for the immigration offense review",
        "href": "#drugs-letter-treatment"
      },
      {
        "name": "Drafting and filing an objection to a deportation order",
        "href": "#drugs-deportation-objection"
      },
      {
        "name": "Drafting an application for temporary release from protection and personal guarantee documents",
        "href": "#drugs-protection-release"
      },
      {
        "name": "Preparing documents for the hearing on cancellation of permanent resident status",
        "href": "#drugs-f5-permanent"
      },
      {
        "name": "Applying for a general status of stay after permanent resident status is cancelled",
        "href": "#drugs-f5-permanent"
      },
      {
        "name": "Checking whether the restriction on granting overseas Korean (F-4) status applies",
        "href": "#drugs-f4-limit"
      },
      {
        "name": "Reviewing status of stay application documents involving an overseas criminal record",
        "href": "#drugs-overseas-record"
      },
      {
        "name": "Checking the restriction period for an inviter's Certificate for Confirmation of Visa Issuance",
        "href": "#drugs-employer-invite"
      },
      {
        "name": "Preparing immigration documents before release from prison",
        "href": "#drugs-prison-release"
      },
      {
        "name": "Drafting a request to lift an entry ban",
        "href": "#drugs-reentry"
      },
      {
        "name": "Drafting an application to postpone the departure deadline under a departure order",
        "href": "/dispositions/departure-order"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreigners investigated or criminally punished for using, possessing or trading drugs, and foreigners for whom drug addiction raises an entry ban issue"
      },
      {
        "label": "Requirements",
        "value": "A person released after being sentenced to imprisonment without labor or heavier can become subject to deportation; even permanent residents may face cancellation of permanent resident status when a sentence of 2 years or more of imprisonment with or without labor becomes final, and deportation may be considered on release after a sentence of 5 years or more."
      },
      {
        "label": "Process",
        "value": "Investigation and criminal disposition → notification to immigration (for prisoners, the correctional facility notifies when release is decided) → investigation and review → deportation order, or departure order or stay permit → objection and temporary release from protection"
      },
      {
        "label": "Documents",
        "value": "Judgment and sentence execution documents, medical certificate and treatment participation confirmation from the treatment facility, family relationship documents, personal guarantee, and employment and residence records"
      },
      {
        "label": "Processing time",
        "value": "When the review result comes out varies by immigration office. An objection to a deportation order must be filed within 7 days of receiving the order, and protection under a deportation order starts within a 2-month range and in principle cannot exceed 9 months in total."
      }
    ],
    "situations": [
      {
        "id": "drugs-f5-permanent",
        "chip": "Losing F-5",
        "q": "I have Korean permanent residency (F-5) — will it be cancelled if I am punished in a drug case?",
        "a": "It can be, depending on the sentence. A final sentence of 2 years or more of imprisonment with or without labor for violating drug laws is a ground for cancelling permanent resident status, and a person released after being sentenced to 5 years or more of imprisonment with or without labor can become subject to deportation even as a permanent resident. Even if permanent resident status is cancelled, you can receive a general status of stay on application if the need for continued stay is recognized and you meet the requirements, so prepare family relationship, income and need-for-stay documents together. When a hearing is held before cancellation, the grounds and the date, time and place are notified at least 7 days before the hearing date."
      },
      {
        "id": "drugs-f4-limit",
        "chip": "F-4 restriction",
        "q": "If an overseas Korean (F-4) is sentenced in a drug case in Korea, can they keep F-4 status?",
        "a": "It is difficult if you received imprisonment without labor or heavier. Drugs are classified as a 'serious social crime' together with voice phishing and habitual drunk driving, and a person sentenced to imprisonment without labor or heavier for such a crime while staying in Korea is subject to restrictions on granting overseas Korean (F-4) status. If you only received a criminal fine, you need to check separately whether the total of fines in Korea is 7 million won or more and whether 3 years have passed since the date that fine was fully paid. Gather the judgment, sentence execution documents and fine payment receipts, confirm first whether the restriction applies, and then prepare your extension application."
      },
      {
        "id": "drugs-overseas-record",
        "chip": "Drug record abroad",
        "q": "I was punished for a drug offense in another country — can I still get a Korean visa?",
        "a": "It is restricted for a long time depending on the status of stay. For a person sentenced for a drug offense in their country of nationality or a third country, overseas Korean (F-4) visa issuance and change of status are not granted for 7 years from the sentencing date, and for permanent residence (F-5) the person is treated as not meeting the good conduct requirement and approval is restricted. Statuses such as points-based talent residence (F-2-7) also list a sentence for a drug-related crime abroad as a disqualifying ground. The record will appear on the overseas criminal record certificate required at application, so prepare translations of the judgment and proof that the sentence was completed, together with an explanation."
      },
      {
        "id": "drugs-addict-entry",
        "chip": "Addiction treatment history",
        "q": "If I have been treated for drug addiction, will I be banned from entering Korea?",
        "a": "The Immigration Act lists drug addicts among the persons the Minister of Justice may ban from entry, so the issue is whether you currently fall under 'drug addict'. If such an entry ban ground is discovered or arises after a foreigner is already in Korea, they can become subject to deportation. If you have completed treatment, it is important to show your current condition with a medical certificate and treatment completion confirmation from the treatment facility and later test results. If an entry ban is already in place, attach the same documents to the request to lift it."
      },
      {
        "id": "drugs-protection-release",
        "chip": "Temporary release",
        "q": "I am being held in a Korean immigration detention center after a drug case — can I apply for temporary release?",
        "a": "Yes. The detainee or a guarantor can apply to the Foreigner Protection Committee for temporary release from protection, and the head of the office can also release ex officio, with conditions such as a deposit of up to 20 million won, a residence restriction, regular reporting and designation of a personal guarantor. The decision considers the detainee's circumstances, the reasons for the request and assets, so prepare a personal guarantee, proof of residence and family relationship and treatment-need documents. Protection under a deportation order starts within a 2-month range and can be extended by 3 months at a time with the committee's approval, and the total period in principle cannot exceed 9 months."
      },
      {
        "id": "drugs-deportation-objection",
        "chip": "Objection deadline",
        "q": "I received a deportation order in Korea after a drug case — by when do I have to file an objection?",
        "a": "You must file an objection with the Minister of Justice, through the head of the immigration office with jurisdiction, within 7 days of receiving the deportation order. If the Minister decides the objection has merit, a person in protection is released immediately; if it is found to have no merit, the result is notified. In the objection, describe specifically the circumstances of the case, your treatment and prevention efforts, and your family and life in Korea, and attach the judgment, family relationship documents and medical certificates. The period is short, so it is safest to start preparing the day you receive the order."
      },
      {
        "id": "drugs-employer-invite",
        "chip": "Employer invitation limits",
        "q": "Can a foreign business owner who was punished in a drug case in Korea invite foreign employees?",
        "a": "It can be restricted for a certain period. A Certificate for Confirmation of Visa Issuance may be withheld from an inviter for whom 3 years have not passed since the date a prison sentence of imprisonment without labor or heavier for violating drug control laws was completed or waived, or since a suspended sentence of imprisonment without labor or heavier became final. A criminal fine alone is not included in this restriction, but it may be considered along with other circumstances in the invitation review. Before inviting, check the judgment and the date the sentence ended to see whether the restriction period has passed."
      },
      {
        "id": "drugs-prison-release",
        "chip": "Handover on release",
        "q": "I am in prison for a drug case in Korea — will I be handed over to immigration as soon as I finish my sentence?",
        "a": "You may be. Heads of prisons and detention centers must notify the immigration office without delay when the release of a foreigner subject to notification is decided, and a person released after being sentenced to imprisonment without labor or heavier can become subject to deportation. If you cannot be returned right away, you can be held in a protection facility, so check your passport status while in prison and have your family prepare a personal guarantee, family relationship documents and a statement of opinion in advance. If you receive a deportation order after release, you can file an objection within 7 days of receiving it."
      },
      {
        "id": "drugs-reentry",
        "chip": "Re-entry after deportation",
        "q": "How to lift an entry ban to Korea after being deported for a drug case — how many years until I can return?",
        "a": "The period set by law is an entry ban on 'a person who has not passed 5 years since leaving after receiving a deportation order', and after that, whether an entry ban applies and for how long is decided case by case. Being a drug addict is a separate entry ban ground, and some statuses of stay, such as overseas Korean (F-4), separately restrict people who were sentenced for drugs. To request lifting the ban, set out in writing the proof that your sentence ended, your treatment history and the family or business reasons you need to come to Korea, and submit them with evidence. Processing time varies by the authority with jurisdiction."
      },
      {
        "id": "drugs-letter-treatment",
        "chip": "Showing treatment history",
        "q": "How should I include my treatment history in the statement of opinion for a drug-case immigration offense review in Korea?",
        "a": "It is important to show your treatment history with objective documents rather than describe it in words. Attach the treatment facility's medical certificate, treatment participation confirmation, regular test results and counseling records in date order, and in the body of the statement describe the circumstances of the case truthfully, then explain when treatment began and how you live now. Petition letters from family and employment records help show that you have an environment that prevents recurrence. If you have been asked to appear, have the documents ready before the notified date and prepare translations of any foreign-language documents."
      }
    ],
    "terms": [
      {
        "term": "Entry ban (입국금지)",
        "def": "A disposition by which the Minister of Justice bans entry of persons such as drug addicts, those who may harm public safety or social order, and those who have not passed 5 years since leaving after receiving a deportation order."
      },
      {
        "term": "Protection/detention (보호)",
        "def": "An enforcement measure in which an immigration officer brings a person reasonably suspected of being subject to deportation to an immigration holding room or detention center and holds them in order to remove them from Korea."
      },
      {
        "term": "Temporary release from protection (보호의 일시해제)",
        "def": "Temporarily releasing a detainee, taking into account their circumstances, the reasons for the request and their assets, on conditions such as a deposit of up to 20 million won, a residence restriction, regular reporting and designation of a personal guarantor."
      },
      {
        "term": "Special rules on cancelling permanent resident status (영주자격 취소 특례)",
        "def": "A system under which permanent resident status is cancelled only in set cases, such as obtaining it by false means, a final sentence of 2 years or more of imprisonment with or without labor for certain offenses, or combined sentences of 3 years or more in the last 5 years, and under which the person can receive a general status of stay if they meet the requirements."
      },
      {
        "term": "Serious social crimes (사회적 중대범죄)",
        "def": "A classification used in stay reviews grouping drugs, voice phishing and habitual (3 or more times) drunk driving, applied for example to restrictions on granting overseas Korean (F-4) status."
      },
      {
        "term": "Objection to a deportation order (강제퇴거명령 이의신청)",
        "def": "The procedure in which a person who received a deportation order files an objection with the Minister of Justice, through the head of the regional immigration office, within 7 days of receiving the order."
      },
      {
        "term": "Certificate for Confirmation of Visa Issuance (사증발급인정서)",
        "def": "A document confirming visa issuance that a person wishing to invite a foreigner applies for in Korea in advance; it may be withheld if the inviter has certain criminal records."
      }
    ],
    "clients": [
      "Families of foreign prisoners about to be released after serving a sentence in a drug case",
      "Permanent residents who received notice of a hearing on cancellation of permanent resident status after a drug case",
      "Guarantors seeking temporary release of a family member held in an immigration detention center after a drug case",
      "Overseas Koreans weighing an F-4 application because of a drug-related sentence received abroad",
      "Foreigners who have completed treatment and want to request lifting of an entry ban"
    ]
  },
  "assault": {
    "serviceName": "Immigration Offense Review and Stay Permit Support for Foreigners in Assault and Injury Cases",
    "serviceType": "Preparation of explanatory documents for immigration offense review and filing of stay permit applications on your behalf",
    "coreAnswer": "Being investigated by the police for assault or bodily injury does not by itself cancel your status of stay, but the outcome of the case (no charges, deferred prosecution, a fine, imprisonment, etc.) is checked when you apply for an extension of period of stay (체류기간 연장허가) or a change of status of stay (체류자격 변경허가), and if you are sentenced to imprisonment without labor or a heavier penalty and then released, you can become subject to deportation. If you are looking for an administrative agent in Korea for assault cases, our office prepares your explanatory documents for the immigration offense review (사범심사) and organizes your settlement with the victim and evidence of your life in Korea.",
    "servicesHeading": "What our administrative agents handle in immigration offense reviews for assault and injury cases",
    "services": [
      {
        "name": "Drafting explanatory documents for the immigration offense review (opinion statement, letter of apology, petition)",
        "href": "#assault-victim-settlement"
      },
      {
        "name": "Organizing the settlement agreement with the victim and proof of compensation",
        "href": "#assault-victim-settlement"
      },
      {
        "name": "Filing an extension of period of stay while the investigation is ongoing",
        "href": "#assault-extension-pending"
      },
      {
        "name": "Preparing for an immigration interview and reviewing the written statement record",
        "href": "#assault-statement-correction"
      },
      {
        "name": "Reviewing documents for a Certificate for Confirmation of Visa Issuance (사증발급인정서) for E-7 (Special Occupation)",
        "href": "#assault-e7-invite"
      },
      {
        "name": "Filing an extension of period of stay for Overseas Koreans (F-4)",
        "href": "#assault-f4-suspended"
      },
      {
        "name": "Preparing explanatory documents for the hearing on cancellation of permanent residency",
        "href": "#assault-f5-holder"
      },
      {
        "name": "Drafting and filing an objection to a deportation order (강제퇴거명령)",
        "href": "#assault-deportation-objection"
      },
      {
        "name": "Drafting an application for temporary release from protection and an opinion on extension of the protection period",
        "href": "#assault-protection-period"
      },
      {
        "name": "Filing an extension of period of stay for marriage migrants (F-6) who are victims of domestic violence",
        "href": "#assault-dv-victim"
      },
      {
        "name": "Drafting a request to lift an entry ban (입국금지)",
        "href": "/dispositions/entry-ban"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreigners investigated by the police for assault or bodily injury, or who received deferred prosecution, a fine, or a sentence of imprisonment with or without labor, and marriage migrants who reported domestic violence"
      },
      {
        "label": "Requirements",
        "value": "Being investigated does not by itself cancel your status of stay, but the outcome is reviewed in extension and change applications, and if you are sentenced to imprisonment without labor or a heavier penalty and released, you can become subject to deportation."
      },
      {
        "label": "Procedure",
        "value": "Police investigation and disposition → notice to immigration, or check at the time of an extension/change application → appearance and statement (review of the record) → decision among stay permit, departure order, or deportation"
      },
      {
        "label": "Required documents",
        "value": "Notice of the case outcome or court judgment, settlement agreement and the victim's statement of no wish to punish, medical certificate, letter of apology and petition, family relationship and employment documents"
      },
      {
        "label": "Processing time",
        "value": "It depends on the immigration office with jurisdiction. An extension of period of stay must be filed before your current period expires, and an objection to a deportation order must be filed within 7 days of receiving the order."
      }
    ],
    "situations": [
      {
        "id": "assault-police-investigation",
        "chip": "Police investigation and your visa",
        "q": "I was investigated by Korean police for an assault case — will it affect my visa?",
        "a": "Being investigated does not by itself cancel your status of stay right away, but the impact depends on the result of the investigation. Public officials who discover an immigration law violator or a person subject to deportation in the course of their duties must notify the immigration office, so problems such as overstaying can come to light during the investigation. If there are no charges, keep the notice of the case outcome. If you receive deferred prosecution or a fine, it will show up as a criminal record at your next extension or change, so prepare the decision, the settlement agreement, and a letter of apology. If you are sentenced to imprisonment with or without labor and released, you can become subject to deportation."
      },
      {
        "id": "assault-extension-pending",
        "chip": "Extension during investigation",
        "q": "My Korea visa expires before the assault investigation is finished — how do I apply for an extension?",
        "a": "Even while the investigation is ongoing, you must apply for an extension before your period of stay ends. If you do not apply and stay past the deadline, you become an overstayer separately from the case, which is punishable by up to 3 years of imprisonment or a fine of up to 30 million won and makes you subject to deportation. When applying, submit the regular extension documents together with any case papers you received, such as a summons or a notice of the case outcome, to explain where things stand, and if you are asked for additional materials during review, submit them by the deadline. If the extension is denied, you must leave by the departure deadline set within 14 days of the date the notice was issued."
      },
      {
        "id": "assault-victim-settlement",
        "chip": "Submitting a settlement",
        "q": "If I settle with the assault victim, what documents should I submit to the Korean immigration offense review?",
        "a": "The basics are the original settlement agreement and a written statement from the victim saying they do not wish you to be punished. For an injury case, attach records of paid medical costs and compensation to show how far the harm has been repaired. If you could not reach a settlement, organize evidence of your efforts to make amends, such as a court deposit or records of attempts to contact the victim. In your opinion statement, describe how the incident happened and your concrete efforts to prevent it from happening again, such as completing anger management education or changes in your living environment. Have everything ready before the date on your summons, and if the schedule is difficult, contact the office in advance to reschedule."
      },
      {
        "id": "assault-e7-invite",
        "chip": "E-7 re-invitation",
        "q": "If an E-7 skilled worker gets a fine for assault in Korea, can the company invite them again or change their visa?",
        "a": "It may become difficult. In reviews for skilled workers (E-7-3, E-7-4), a criminal record during your stay in Korea such as drunk driving, assault, or theft is considered a reason to withhold a Certificate for Confirmation of Visa Issuance. Under the points system for skilled workers (E-7-4), you cannot apply if you received a fine of 3 million won or more within the last 10 years, and smaller fines lead to deductions of up to 20 points depending on how many there are. Before the company starts the invitation process, check the date and amount of the penalty with the judgment and the fine payment receipt. If you have a settlement agreement and records of your length of employment and certifications, prepare them as well."
      },
      {
        "id": "assault-f4-suspended",
        "chip": "F-4 suspended sentence",
        "q": "If an Overseas Korean (F-4) gets a suspended sentence for assault, will the F-4 extension be restricted?",
        "a": "It can be. If you receive a suspended sentence of imprisonment without labor or heavier, granting of Overseas Korean (F-4) status and similar permissions are restricted until 5 years have passed from the date the judgment became final. For an actual prison sentence, the reference point is 5 years from the date the sentence was completed or the date it was decided not to be enforced. If it was a fine, check whether your total fines in Korea are 7 million won or more and whether 3 years have passed since the date you fully paid the fine at that point. Prepare the judgment and a document showing the date it became final, and calculate the restriction period first."
      },
      {
        "id": "assault-f5-holder",
        "chip": "Permanent resident penalized",
        "q": "Can a permanent resident (F-5) be deported from Korea after being punished for assault?",
        "a": "Holders of permanent residency (F-5) are not deported unless an exception set by law applies. The exceptions are crimes of insurrection or foreign aggression, helping illegal entry or exit, and people sentenced to 5 years or more of imprisonment with or without labor and released who committed crimes set by Ministry of Justice ordinance, such as murder, rape and indecent acts, robbery, or forming or operating a violent group. However, if a sentence of 2 years or more of imprisonment with or without labor becomes final for violating the Criminal Act or similar laws, it is a ground for cancellation of permanent residency, and even if it is cancelled, you can apply for a general status of stay if you meet the requirements. Prepare the judgment and documents on your family and life in Korea in advance."
      },
      {
        "id": "assault-deportation-objection",
        "chip": "If you have family here",
        "q": "I received a deportation order in Korea for an assault case — can I file an objection if I have family in Korea?",
        "a": "Yes. You must submit an objection to the Minister of Justice through the head of the immigration office with jurisdiction within 7 days of receiving the deportation order, and the office forwards it to the Minister of Justice with the review decision and the investigation records. Attach a family relationship certificate, the stay status of your spouse and children, your children's school enrollment certificates, proof that you support your family, and the settlement agreement with the victim, to show concretely why you need to remain in Korea. If the objection is found to have merit, a person in protection is released from protection immediately."
      },
      {
        "id": "assault-protection-period",
        "chip": "Protection period",
        "q": "After serving a sentence for bodily injury in Korea, how long can I be held in an immigration detention center?",
        "a": "If you receive a deportation order and cannot be repatriated right away, you can be held in protection (보호) for up to 2 months, and after that it can be extended by 3 months at a time with the approval of the Foreigner Protection Committee, for a total of no more than 9 months. However, a person sentenced to imprisonment without labor or heavier for crimes set by presidential decree, such as murder, bodily injury, rape, indecent acts, or robbery, can be held for up to a total of 20 months if they still cannot be repatriated after 9 months. Before an application for approval to extend the protection period, you are given a chance to state your opinion orally or in writing, so prepare an opinion statement covering your cooperation with repatriation and your family circumstances. Temporary release from protection (보호의 일시해제) with a deposit of up to 20 million won and conditions can also be considered."
      },
      {
        "id": "assault-deferred-prosecution",
        "chip": "Effect of deferred prosecution",
        "q": "I got deferred prosecution for an assault case in Korea — will it affect my residence (F-2) visa review later?",
        "a": "It can. Deferred prosecution is a decision not to send the case to trial, but a record remains. In the extension review for skilled-worker residence (F-2), if the case counts as a 'serious crime', there must be none at all within the 10 years before the application date, and deferred prosecution, suspended sentencing, and fines of 1 million won or less are all counted. For other statuses too, the content and timing of the disposition are reviewed under the criteria for restricting stay permits. Keep the prosecution's notice of the case outcome, the settlement agreement, and your letter of apology, and submit them as documents explaining what happened when you apply for an extension or change."
      },
      {
        "id": "assault-statement-correction",
        "chip": "Correcting your statement",
        "q": "If the statement record from my Korean immigration interview about an assault case is wrong, can I correct it?",
        "a": "Yes. The immigration officer must read the record to you or let you read it and then ask whether anything is written incorrectly, and if you request additions, deletions, or changes, your statement must be written into the record. If you refuse to sign or affix your name and seal, that fact is recorded, so rather than refusing outright, it is better to point out exactly which parts are different and have them corrected. In cases where how the incident happened is disputed, such as mutual assault, organize in advance whether CCTV footage has been secured, medical certificates, and witnesses' contact details."
      },
      {
        "id": "assault-dv-victim",
        "chip": "Domestic violence victim",
        "q": "I am a marriage migrant who reported my husband for domestic violence — what happens if my visa expires during the trial in Korea?",
        "a": "A spouse of a Korean national who is going through a remedy procedure such as a trial or investigation because of domestic violence can be granted an extension of period of stay until that procedure ends, and can receive further extensions afterward if needed for recovery from the harm. If you are also being investigated for assault because of a counter-complaint, you need to separately explain that a procedure regarding the harm you suffered is ongoing. When applying, prepare a case receipt confirmation or documents showing that the investigation or trial is in progress, medical certificates, and counseling records. The extension must be applied for before your current period of stay ends."
      }
    ],
    "terms": [
      {
        "term": "Duty to notify (통보의무)",
        "def": "The duty of national or local government officials who discover a person subject to deportation or an immigration law violator in the course of their duties to notify the head of the immigration office without delay."
      },
      {
        "term": "Suspect interrogation record (용의자신문조서)",
        "def": "A record of statements written by an immigration officer while questioning a suspect. One prepared in an immigration offense investigation is treated as a suspect interrogation record under the Criminal Procedure Act."
      },
      {
        "term": "Deportation order document (강제퇴거명령서)",
        "def": "The written document issued to a suspect when the head of the immigration office finds, after review, that the person is subject to deportation and issues a deportation order."
      },
      {
        "term": "Foreigner Protection Committee (외국인보호위원회)",
        "def": "The body that approves extensions of the protection period for people who received a deportation order and decides applications for temporary release from protection by people in protection."
      },
      {
        "term": "Opportunity to state an opinion (의견진술 기회)",
        "def": "The procedure of giving the foreigner a chance to state their opinion orally or in writing before measures such as issuing a protection order or applying for approval to extend the protection period."
      },
      {
        "term": "Special rules for marriage migrants (결혼이민자 등에 대한 특칙)",
        "def": "A system that allows an extension of period of stay, until the procedure ends, for foreigners going through a remedy procedure as victims of domestic violence, sexual violence, child abuse, or human trafficking."
      },
      {
        "term": "Special rules on cancellation of permanent residency (영주자격 취소 특례)",
        "def": "A system under which permanent residency is cancelled only in specified cases, such as obtaining it by deception or a final sentence of 2 years or more of imprisonment with or without labor for violating certain laws, and under which a general status of stay can be granted if the requirements are met."
      }
    ],
    "clients": [
      "Workers investigated by the police for assault whose period of stay expires next month",
      "International students who received an immigration summons over a mutual assault case",
      "Overseas Koreans checking whether they can extend F-4 after a suspended sentence for bodily injury",
      "Korean spouses of foreigners who finished a prison term for assault and received a deportation order",
      "Marriage migrants who reported domestic violence and need an extension of period of stay"
    ]
  },
  "sexual-offense": {
    "serviceName": "Deportation and Permanent Residency Cancellation Support for Foreigners in Sexual Offense Cases",
    "serviceType": "Drafting objections to deportation orders, documents for permanent residency cancellation hearings, and applications for temporary release from protection on your behalf",
    "coreAnswer": "A foreigner sentenced to imprisonment without labor or heavier for a sexual offense and then released can become subject to deportation, and sexual violence crimes are among the offenses for which even a permanent resident (F-5) faces cancellation of permanent residency when a sentence of 2 years or more of imprisonment with or without labor becomes final, and a deportation review when released after a sentence of 5 years or more. If you are looking for an administrative agent in Korea for sexual offense cases, our office drafts opinion statements for the immigration offense review (사범심사), objections to a deportation order (강제퇴거명령), and applications for temporary release from protection (보호의 일시해제), and also handles extension of period of stay (체류기간 연장허가) applications for foreigners who reported sexual violence.",
    "servicesHeading": "What our administrative agents handle in immigration offense reviews for sexual offense cases",
    "services": [
      {
        "name": "Drafting the opinion statement and mitigating materials for the immigration offense review",
        "href": "#sex-investigation-extension"
      },
      {
        "name": "Preparing explanatory documents for the hearing on cancellation of permanent residency",
        "href": "#sex-hearing-notice"
      },
      {
        "name": "Applying for a general status of stay after cancellation of permanent residency",
        "href": "#sex-f5-revocation"
      },
      {
        "name": "Drafting and filing an objection to a deportation order",
        "href": "#sex-deportation-objection"
      },
      {
        "name": "Drafting an application for temporary release from protection and an opinion on extension of the protection period",
        "href": "#sex-protection-20months"
      },
      {
        "name": "Filing an extension of period of stay for foreign victims of sexual violence",
        "href": "#sex-victim-extension"
      },
      {
        "name": "Applying for Miscellaneous (G-1) status for victims of sexual violence and others",
        "href": "#sex-victim-extension"
      },
      {
        "name": "Reviewing the restriction period on a Certificate for Confirmation of Visa Issuance (사증발급인정서) for the inviting party",
        "href": "#sex-employer-invite"
      },
      {
        "name": "Reviewing change of status of stay documents involving an overseas criminal record",
        "href": "#sex-overseas-record"
      },
      {
        "name": "Drafting a request to lift an entry ban (입국금지)",
        "href": "#sex-entry-ban-lift"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreigners and permanent residents investigated or criminally penalized for a sexual offense, and foreigners who reported sexual violence"
      },
      {
        "label": "Requirements",
        "value": "If you are sentenced to imprisonment without labor or heavier and released, you can become subject to deportation. For permanent residents, cancellation of permanent residency can be considered when a sentence of 2 years or more of imprisonment with or without labor becomes final, and deportation when released after a sentence of 5 years or more. Victims can be granted extensions until the remedy procedure ends."
      },
      {
        "label": "Procedure",
        "value": "Criminal disposition → notice to and review by immigration → hearing if permanent residency is to be cancelled (notice 7 days before the appearance date) → decision on cancellation or deportation → objection and temporary release from protection"
      },
      {
        "label": "Required documents",
        "value": "Judgment and sentence enforcement records, family relationship documents, proof of compensation to the victim, and (for victims) case receipt and investigation progress documents with counseling and medical records"
      },
      {
        "label": "Processing time",
        "value": "It depends on the immigration office with jurisdiction. An objection to a deportation order must be filed within 7 days of receiving the order, and protection under a deportation order is in principle up to 9 months in total, or up to 20 months for certain serious crimes."
      }
    ],
    "situations": [
      {
        "id": "sex-f5-revocation",
        "chip": "Permanent residency cancelled",
        "q": "Will my Korean permanent residency (F-5) be cancelled if I am convicted of a sexual offense?",
        "a": "Depending on the sentence, it can be cancelled, and deportation may even be considered. If a sentence of 2 years or more of imprisonment with or without labor becomes final for violating laws on sexual violence crimes, it is a ground for cancellation of permanent residency, and if you are sentenced to 5 years or more of imprisonment with or without labor for rape, indecent acts, or a sexual violence crime and released, even a permanent resident can become subject to deportation. Even if your permanent residency is cancelled, you can receive a general status of stay on application if the need to keep living in Korea is recognized and you meet the requirements. Prepare the judgment, family relationship documents, and materials showing why you need to stay in advance."
      },
      {
        "id": "sex-hearing-notice",
        "chip": "Preparing for the hearing",
        "q": "I received a notice to appear at a hearing on cancellation of my permanent residency in Korea — what should I prepare?",
        "a": "First check the cancellation ground stated in the notice, and prepare an opinion statement that addresses that ground. The intended ground for cancellation and the date, time, and place of appearance are notified at least 7 days before the appearance date, so the time from receiving the notice to the appearance date is your preparation period. In the opinion statement, describe the judgment and how the sentence has been served, your efforts to compensate the victim, and your family and livelihood in Korea, and also prepare the required documents for a general status of stay so that you can receive one even if your permanent residency is cancelled. If you cannot attend, let the office know in advance and check whether you can submit in writing."
      },
      {
        "id": "sex-protection-20months",
        "chip": "Extended protection",
        "q": "If I am held in a Korean immigration detention center after serving a sentence for a sexual offense, can the detention last longer?",
        "a": "It can. Protection (보호) under a deportation order cannot in principle exceed 9 months in total, but a person sentenced to imprisonment without labor or heavier for crimes set by presidential decree, such as rape, indecent acts, or sexual offenses against children and youth, can be held for up to 20 months in total, extended by 3 months at a time with the approval of the Foreigner Protection Committee, if they still cannot be repatriated after 9 months. Before an application for approval of an extension, you have a chance to state your opinion orally or in writing, so submit an opinion statement covering your cooperation with repatriation and your family circumstances. You can also apply for temporary release from protection with a deposit of up to 20 million won and conditions such as a residence restriction."
      },
      {
        "id": "sex-victim-extension",
        "chip": "Victim's stay",
        "q": "I reported sexual violence in Korea — do I have to leave the country if my visa expires during the investigation?",
        "a": "There is a way to avoid leaving right away. A foreigner going through a remedy procedure such as a trial or investigation because of a sexual violence crime can be granted an extension of period of stay until that procedure ends, and further extensions are possible afterward if needed for recovery from the harm. Even if such a foreigner becomes subject to deportation, enforcement of the deportation order can be suspended or the person can be temporarily released from protection with conditions while the procedure is ongoing, and there is also the Miscellaneous (G-1) status for people who need humanitarian consideration, such as victims of sexual violence. Prepare a case receipt confirmation, documents on the progress of the investigation or trial, and counseling and medical records, and apply before your period of stay ends."
      },
      {
        "id": "sex-employer-invite",
        "chip": "Employer invitation restricted",
        "q": "Can an employer who was punished for a sexual offense in Korea still get a visa issuance certificate to invite a foreign employee?",
        "a": "It may not be issued for a certain period. A Certificate for Confirmation of Visa Issuance may be refused for an inviting party for whom 5 years have not passed since the date an actual sentence of imprisonment without labor or heavier for violating laws on sexual violence crimes was completed or exempted, or since the date a suspended sentence of imprisonment without labor or heavier became final. If you are a company representative or sole proprietor, check the date the judgment became final and the date the sentence ended before inviting anyone, and calculate the restriction period. Even after the restriction period has passed, other circumstances may also be reviewed in the invitation assessment."
      },
      {
        "id": "sex-overseas-record",
        "chip": "Overseas sexual offense record",
        "q": "If I was punished for a sexual offense in my home country, can I still change to a residence (F-2) visa in Korea?",
        "a": "Depending on the status, it is a disqualifying factor. Statuses such as points-based talented residence (F-2-7) and K-STAR residence (F-2-7S) treat having been sentenced abroad for a sexual violence-related crime as a disqualification. Applications for long-term statuses often require an overseas criminal record certificate, so the record cannot be hidden, and a permit obtained by deception or other wrongful means can be cancelled later. Prepare a translated copy of the judgment and records showing the sentence has ended, and first review whether you can keep your current status or whether there is another way to stay."
      },
      {
        "id": "sex-deportation-objection",
        "chip": "Objection with family",
        "q": "I received a deportation order in Korea for a sexual offense case — will having a Korean spouse and children be considered in my objection?",
        "a": "Your family circumstances are key material that must be included in the objection. The objection must be filed with the Minister of Justice through the head of the immigration office with jurisdiction within 7 days of receiving the deportation order, and the office forwards it with the review decision and investigation records. Attach a marriage relationship certificate and family relationship certificate, your children's school documents, proof that you support your family, proof of compensation to the victim, and records of completing reoffending prevention education. The result is notified through the office, so while you wait, also consider temporary release from protection and prepare for departure."
      },
      {
        "id": "sex-investigation-extension",
        "chip": "Extension while accused",
        "q": "I am under investigation in Korea after being accused of sexual harassment — can I still apply for a visa extension?",
        "a": "You must. Even during an investigation, if you do not apply for an extension before your period of stay ends, you will be violating the rules on overstaying separately from the case. The review may ask for additional materials to check on the progress of the case, so keep your summons and the documents related to the complaint and explain truthfully. If the case ends with no charges or similar, submit the notice of the case outcome; if you are indicted, submit the later judgment at your next review."
      },
      {
        "id": "sex-false-visa-application",
        "chip": "Hiding a record",
        "q": "What happens if I hide a sexual offense record when applying for a Korean visa?",
        "a": "If it comes to light, it can lead to criminal punishment, deportation, and cancellation of your permit. Applying for a visa or a Certificate for Confirmation of Visa Issuance with false information is punishable under the Immigration Act by up to 3 years of imprisonment or a fine of up to 30 million won, and a foreigner who entered that way becomes subject to deportation. A permit obtained by deception or other wrongful means can be cancelled even if this is discovered later. If you have a record, apply truthfully with the judgment and records showing the sentence has ended, and if there is an entry ban, start by reviewing a request to lift it."
      },
      {
        "id": "sex-entry-ban-lift",
        "chip": "Lifting the entry ban",
        "q": "How to lift an entry ban to Korea after being deported for a sexual offense?",
        "a": "You can request it, but the timing and supporting materials matter. A person who left after receiving a deportation order can be subject to an entry ban for up to 5 years after departure, and whether entry restrictions continue after that and for how long is decided case by case. In the request to lift the ban, describe in detail and with supporting documents the records showing the sentence has ended, records of completing reoffending prevention education, and the family or humanitarian reasons you need to come to Korea. Processing time depends on the authority with jurisdiction."
      }
    ],
    "terms": [
      {
        "term": "Special rules on cancellation of permanent residency (영주자격 취소 특례)",
        "def": "A system under which permanent residency is cancelled only in specified cases, such as obtaining it by deception, a final sentence of 2 years or more of imprisonment with or without labor for violating laws on sexual violence crimes and similar laws, or combined prison terms of 3 years or more within the last 5 years."
      },
      {
        "term": "General status of stay (일반체류자격)",
        "def": "A status of stay other than permanent residency that can be granted on application to a person whose permanent residency was cancelled, if the need to keep living in Korea is recognized and the requirements are met."
      },
      {
        "term": "Hearing (의견청취)",
        "def": "A procedure in which the Minister of Justice has the foreigner appear and hears their opinion when needed to cancel or change a stay permit or similar. The grounds and the date, time, and place of appearance must be notified at least 7 days before the appearance date."
      },
      {
        "term": "Approval to extend the protection period (보호기간 연장 승인)",
        "def": "The procedure for extending protection by up to 3 months at a time, with the approval of the Foreigner Protection Committee, when a person who received a deportation order still cannot be repatriated after 2 months."
      },
      {
        "term": "Special rules for marriage migrants (결혼이민자 등에 대한 특칙)",
        "def": "A system that allows an extension of period of stay, until the procedure ends, for foreigners going through a remedy procedure such as a trial or investigation as victims of sexual violence, domestic violence, and similar harm."
      },
      {
        "term": "Prohibition of false invitations (허위초청 등의 금지)",
        "def": "Rules prohibiting inviting a foreigner with false statements or a false guarantee of identity, applying for a visa or a Certificate for Confirmation of Visa Issuance with false information, or brokering such acts."
      },
      {
        "term": "Entry restriction (입국규제)",
        "def": "A measure by which the Ministry of Justice blocks entry by a foreigner who falls under a ground for an entry ban. Apart from the 5 years after deportation, whether restrictions apply and for how long is decided case by case."
      }
    ],
    "clients": [
      "Permanent residents who received a hearing notice on cancellation of their permanent residency over a sexual offense case",
      "Korean spouses whose family member was placed in an immigration detention center after serving a sentence",
      "Workers accused of a sexual offense whose period of stay is about to expire",
      "Foreigners who reported sexual violence and need to stay in Korea during the investigation",
      "Foreigners reviewing a request to lift entry restrictions after a certain period has passed since deportation"
    ]
  },
  "property-crime": {
    "serviceName": "Immigration Offense Review and Stay Permit Support for Foreigners in Theft, Fraud, and Embezzlement Cases",
    "serviceType": "Preparation of explanatory documents for immigration offense review and filing of stay permit applications on your behalf",
    "coreAnswer": "If you receive a fine for theft, fraud, or embezzlement, it is reviewed as a criminal record when you apply for an extension of period of stay (체류기간 연장허가) or a change of status of stay (체류자격 변경허가), statuses such as Overseas Korean (F-4) and permanent residency (F-5) are restricted for a certain period depending on your total fines or the type of sentence, and if you are sentenced to imprisonment without labor or heavier and released, you can become subject to deportation. If you are looking for an administrative agent in Korea for property crime cases, our office organizes your proof of restitution for the immigration offense review (사범심사) and files your extension or change applications.",
    "servicesHeading": "What our administrative agents handle in immigration offense reviews for property crime cases",
    "services": [
      {
        "name": "Drafting the opinion statement and proof of restitution for the immigration offense review",
        "href": "#prop-restitution-docs"
      },
      {
        "name": "Filing an extension of period of stay for students (D-2)",
        "href": "#prop-student-theft-extension"
      },
      {
        "name": "Filing a change of status of stay to Job Seeking (D-10)",
        "href": "#prop-student-theft-extension"
      },
      {
        "name": "Filing an extension of period of stay for Overseas Koreans (F-4)",
        "href": "#prop-f4-fraud"
      },
      {
        "name": "Reviewing disqualifying factors for a change of status of stay to permanent residency (F-5)",
        "href": "#prop-f5-overseas-fraud"
      },
      {
        "name": "Preparing explanatory documents for the hearing on cancellation of permanent residency",
        "href": "#prop-f5-holder-robbery"
      },
      {
        "name": "Drafting documents for the hearing on cancellation of a Corporate Investment (D-8) stay permit",
        "href": "#prop-d8-embezzle"
      },
      {
        "name": "Drafting and filing an objection to a deportation order (강제퇴거명령)",
        "href": "#prop-deportation-objection"
      },
      {
        "name": "Drafting documents on the compliance bond and departure deadline under a departure order (출국명령)",
        "href": "#prop-departure-bond"
      },
      {
        "name": "Drafting a request to lift an entry ban (입국금지)",
        "href": "#prop-reentry"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreigners investigated or criminally penalized for theft, fraud, embezzlement, robbery, and similar offenses, and applicants who were sentenced abroad for a property crime"
      },
      {
        "label": "Requirements",
        "value": "Fines are reviewed in extension and change applications and under the restriction criteria for each status (such as total fines of 7 million won for Overseas Koreans), and if you are sentenced to imprisonment without labor or heavier and released, you can become subject to deportation."
      },
      {
        "label": "Procedure",
        "value": "Criminal disposition → notice to immigration, or check at the time of an extension/change application → appearance and statement → decision among stay permit, cancellation of permit, departure order, or deportation"
      },
      {
        "label": "Required documents",
        "value": "Judgment or summary order, fine payment receipt, records of restitution and settlement agreement, letter of apology, employment and income documents"
      },
      {
        "label": "Processing time",
        "value": "It depends on the immigration office with jurisdiction. For a hearing on cancellation of a stay permit, notice is given at least 7 days before the appearance date, and an objection to a deportation order must be filed within 7 days of receiving the order."
      }
    ],
    "situations": [
      {
        "id": "prop-student-theft-extension",
        "chip": "Student fined for theft",
        "q": "I am an international student who got a fine for shoplifting at a convenience store in Korea — can I still extend my student visa?",
        "a": "You can apply for an extension, but the review will show it as a criminal record, so be ready to explain what happened. If you want to change to Job Seeking (D-10) after graduation, a fine of 3 million won or more within 3 years of the application date, or a sentence of imprisonment without labor or heavier within 5 years, makes you subject to restriction, so the amount and timing matter. Prepare the summary order and fine payment receipt, the settlement agreement with the victim or a restitution receipt, a letter of apology, and certificates of enrollment and attendance. The extension must be filed before your period of stay ends."
      },
      {
        "id": "prop-f4-fraud",
        "chip": "F-4 fraud fines",
        "q": "If an Overseas Korean (F-4) gets several fines for fraud in Korea, will the F-4 status be restricted?",
        "a": "It is restricted depending on your total fines and the type of sentence. If your total fines in Korea are 7 million won or more, granting of Overseas Korean (F-4) status and similar permissions is restricted for 3 years from the date you fully paid the fine that brought the total to that level, and if you received imprisonment without labor or heavier or a suspended sentence, 5 years must pass from the date the sentence ended or the judgment became final. Even when you were sentenced abroad for fraud to a penalty equivalent to imprisonment without labor or heavier, visa issuance and change of status for Overseas Korean (F-4) are not permitted for 5 years from the sentencing date. Gather your judgments and fine payment receipts and start by calculating the period."
      },
      {
        "id": "prop-f5-overseas-fraud",
        "chip": "Overseas fraud record",
        "q": "If I was punished for fraud in another country, can I still change to Korean permanent residency (F-5)?",
        "a": "As a rule, a change of status to permanent residency (F-5) is not permitted if you were sentenced abroad for intimidation, extortion, or fraud. If you received a penalty abroad equivalent to imprisonment without labor or heavier for another crime, you are treated as not meeting the good conduct requirement for 10 years from the sentencing date, so the permit is restricted. The record will appear on your overseas criminal record certificate, so check the content of the judgment and the name of the offense accurately in a translated copy, then first consider keeping your current status or another residence status."
      },
      {
        "id": "prop-f5-holder-robbery",
        "chip": "Permanent resident: theft or robbery",
        "q": "Will a permanent resident be deported from Korea after being punished for theft or robbery?",
        "a": "Holders of permanent residency (F-5) are not deported unless an exception set by law applies, and among property crimes, being sentenced to 5 years or more of imprisonment with or without labor for robbery and released falls under the exceptions. Whether theft, fraud, or embezzlement falls under an exception depends on the law applied and the sentence, so first check the provisions applied in the judgment. If a sentence of 2 years or more of imprisonment with or without labor becomes final for violating the Criminal Act or similar laws, or if the total of sentences that became final within the last 5 years is 3 years or more, it is a ground for cancellation of permanent residency, and even if it is cancelled, you can apply for a general status of stay if you meet the requirements. Prepare the judgment and documents on your family and livelihood in advance."
      },
      {
        "id": "prop-d8-embezzle",
        "chip": "Investor visa embezzlement",
        "q": "If I run a company in Korea on an investor (D-8) visa and get accused of embezzlement, can my status be cancelled?",
        "a": "If the violation is judged to be serious, your stay permit can be cancelled or changed. If a hearing is held before cancellation, the ground for cancellation and the date, time, and place of appearance are notified at least 7 days before the appearance date, so in the meantime you need to prepare an opinion statement with accounting records, records of compensation for the harm, and proof that the investment is being maintained. If the permit is cancelled, you can become subject to a departure order, and the departure deadline is set within 30 days of the date the departure order is issued. If the case is still at the complaint stage, the priority is not to miss your extension deadline until the outcome is known."
      },
      {
        "id": "prop-restitution-docs",
        "chip": "Proof of restitution",
        "q": "I am paying back fraud victims in installments — what documents should I attach to my opinion statement for the Korean immigration offense review?",
        "a": "The key is material that confirms your repayments by date and amount. Attach bank transfer records, the repayment agreement with the victim, and a plan for repaying the remaining amount, and if you have reached a settlement, submit the settlement agreement and the victim's statement of no wish to punish as well. In the opinion statement, describe what happened truthfully and use income documents to show that your repayment plan is realistic. It is best to have everything ready before the date on your summons."
      },
      {
        "id": "prop-departure-bond",
        "chip": "Getting the bond back",
        "q": "I paid a compliance bond when I got a departure order for a theft case in Korea — can I get it back?",
        "a": "You get it back if you keep to the departure deadline and conditions and leave. The compliance bond is money you may be required to deposit, up to 20 million won, when a departure order is issued. If you miss the departure deadline, all or part of it can be forfeited to the national treasury, and if you violate conditions such as a residence restriction, part of it can be forfeited. Unless it is forfeited, it is to be returned when you leave. Keep the deposit receipt and the departure order, and if you need a condition changed, notify the office in advance."
      },
      {
        "id": "prop-deportation-objection",
        "chip": "Objection after repayment",
        "q": "I received a deportation order in Korea for an embezzlement case — will having fully repaid the damage help my objection?",
        "a": "Proof that you have fully repaid the damage is an important circumstance to include in your objection. The objection must be filed with the Minister of Justice through the head of the immigration office with jurisdiction within 7 days of receiving the deportation order. Attach a repayment confirmation and settlement agreement, family relationship documents, and employment and income documents, and describe concretely how your life has changed since the incident. If the objection is found to have merit, a person in protection is released from protection immediately."
      },
      {
        "id": "prop-deferred-shoplifting",
        "chip": "After deferred prosecution",
        "q": "I walked out of a supermarket without paying and got deferred prosecution in Korea — do I need to report it to immigration separately?",
        "a": "There is generally no procedure for reporting deferred prosecution to immigration yourself, but it can come to light when your criminal record is checked at your next extension or change. Some statuses count even deferred prosecution in the review: for example, in the extension review for skilled-worker residence (F-2), if the case counts as a 'serious crime', deferred prosecution, suspended sentencing, and fines of 1 million won or less within 10 years are all counted. Keep the prosecution's notice of the case outcome, the restitution receipt, and a letter of apology, and if you are asked about it in the review, explain truthfully. You can file your extension as usual before your period of stay ends."
      },
      {
        "id": "prop-reentry",
        "chip": "Re-entry after a departure order",
        "q": "If I leave Korea under a departure order for a fraud case, can I come back to Korea later?",
        "a": "Unlike deportation, a departure order does not automatically fall under the statutory entry ban ground of '5 years after deportation', but whether entry restrictions apply and for how long can be decided separately. Leaving by the departure deadline in the departure order (set within 30 days of the issue date) is the foundation for later reviews, and if you miss the deadline, a deportation order is issued. When preparing to return, gather the judgment, restitution and settlement documents, and proof of your departure, and if an entry restriction is confirmed, start by submitting a request to lift it."
      }
    ],
    "terms": [
      {
        "term": "Cancellation or change of a stay permit (체류허가의 취소·변경)",
        "def": "A disposition by which the Minister of Justice cancels or changes visa issuance, stay permits, and similar permissions, for example when the permit was obtained by deception or other wrongful means, the permit conditions were violated, or the violation of law is serious."
      },
      {
        "term": "Departure order (출국명령)",
        "def": "A disposition ordering departure for people such as those subject to deportation who wish to leave voluntarily at their own expense, those whose permit was cancelled, and those for whom departure measures are appropriate after a notice of disposition."
      },
      {
        "term": "Compliance bond (이행보증금)",
        "def": "A deposit of up to 20 million won that may be required when a departure order is issued. It is returned on departure unless there is a ground for forfeiting it to the national treasury."
      },
      {
        "term": "Good conduct requirement (품행단정 요건)",
        "def": "A requirement in reviews for long-term statuses such as permanent residency (F-5) that the applicant's conduct be good, including complying with the laws of the Republic of Korea."
      },
      {
        "term": "Overseas criminal record certificate (해외 범죄경력증명서)",
        "def": "A criminal record certificate issued by the country of nationality or residence, required for many long-term status applications."
      },
      {
        "term": "Special rules on cancellation of permanent residency (영주자격 취소 특례)",
        "def": "A system under which permanent residency is cancelled only in specified cases, such as obtaining it by deception, a final sentence of 2 years or more of imprisonment with or without labor for violating the Criminal Act or similar laws, or combined prison terms of 3 years or more within the last 5 years."
      }
    ],
    "clients": [
      "International students facing a student visa extension after a fine for convenience store theft",
      "Overseas Koreans worried about their F-4 extension as fraud fines add up",
      "Corporate Investment (D-8) company representatives who received a hearing notice on cancellation of their stay permit over an embezzlement complaint",
      "Foreign workers repaying victims while preparing an opinion statement for the immigration offense review",
      "Long-term residents checking whether they can apply for permanent residency (F-5) with a fraud conviction abroad"
    ]
  },
  "voice-phishing": {
    "serviceName": "Immigration Offense Review and Deportation Support for Foreigners Involved in Voice Phishing",
    "serviceType": "Drafting opinion statements for the immigration offense review, objections to deportation orders, and applications for temporary release from protection on your behalf",
    "coreAnswer": "In stay reviews, voice phishing is classified as a 'socially serious crime' together with drugs and repeat drunk driving: Overseas Koreans (F-4) sentenced to imprisonment without labor or heavier are restricted from being granted the status, it is treated as a disqualifying factor in permanent residency and residence status reviews, and if you are sentenced to imprisonment without labor or heavier and released, you can become subject to deportation. If you are looking for an administrative agent in Korea for voice phishing cases, our office drafts the documents explaining how you became involved for foreigners investigated as cash collectors, for lending bank accounts, and similar roles, as well as objections to a deportation order (강제퇴거명령).",
    "servicesHeading": "What our administrative agents handle in immigration offense reviews for voice phishing cases",
    "services": [
      {
        "name": "Drafting the opinion statement for the immigration offense review (how you became involved and restitution)",
        "href": "#vp-opinion-role"
      },
      {
        "name": "Organizing evidence that you had no intent in a bank account lending case",
        "href": "#vp-account-lending"
      },
      {
        "name": "Drafting explanatory documents for unauthorized activity outside a student (D-2) status",
        "href": "#vp-student-courier"
      },
      {
        "name": "Reviewing whether the restriction on granting Overseas Korean (F-4) status applies",
        "href": "#vp-f4-limit"
      },
      {
        "name": "Reviewing when to apply for a change of status of stay to permanent residency (F-5)",
        "href": "#vp-f5-permanent"
      },
      {
        "name": "Drafting and filing an objection to a deportation order",
        "href": "#vp-deportation-objection"
      },
      {
        "name": "Drafting an application for temporary release from protection and guarantor documents",
        "href": "#vp-protection-release"
      },
      {
        "name": "Drafting an application to postpone the departure deadline",
        "href": "#vp-departure-deadline-delay"
      },
      {
        "name": "Reviewing status of stay application documents involving an overseas criminal record",
        "href": "#vp-overseas-visa"
      },
      {
        "name": "Drafting a request to lift an entry ban (입국금지)",
        "href": "#vp-reentry"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreigners investigated or criminally penalized for voice phishing as cash collectors, couriers, for lending bank accounts, and similar roles, and applicants who were sentenced abroad for voice phishing"
      },
      {
        "label": "Requirements",
        "value": "Voice phishing is classified as a socially serious crime, so Overseas Koreans (F-4) sentenced to imprisonment without labor or heavier are restricted, a sentence abroad means Overseas Korean (F-4) is not permitted for 7 years from the sentencing date, and if you are sentenced to imprisonment without labor or heavier and released, you can become subject to deportation."
      },
      {
        "label": "Procedure",
        "value": "Investigation and criminal disposition → notice to immigration (for inmates, at the time release is decided) → investigation and review → deportation order, or departure order or stay permit → objection and temporary release from protection"
      },
      {
        "label": "Required documents",
        "value": "Judgment, materials on how you became involved (job ads, messenger chats, remittance instruction records), records of restitution, school or employment documents, letter of guarantee"
      },
      {
        "label": "Processing time",
        "value": "It depends on the immigration office with jurisdiction. An objection to a deportation order must be filed within 7 days of receiving the order, and the departure deadline under a departure order (출국명령) is set within 30 days of the issue date."
      }
    ],
    "situations": [
      {
        "id": "vp-f4-limit",
        "chip": "F-4 status restricted",
        "q": "What happens to my F-4 stay if an Overseas Korean is punished for a voice phishing case in Korea?",
        "a": "If you received imprisonment without labor or heavier, granting of Overseas Korean (F-4) status and similar permissions is restricted. Voice phishing is classified as a 'socially serious crime' together with drugs and repeat drunk driving, so a person sentenced to imprisonment without labor or heavier for it is subject to restriction. For a fine, it is checked separately whether your total fines in Korea are 7 million won or more and whether 3 years have passed since the date you fully paid the fine at that point. First check whether it applies to you using the judgment and sentence enforcement documents. If you are subject to restriction, you need to settle on another way to stay or a departure schedule before your period of stay ends to avoid overstaying."
      },
      {
        "id": "vp-account-lending",
        "chip": "Investigated for lending an account",
        "q": "I lent my bank account and debit card thinking it was a part-time job and now I am being investigated by Korean police — what happens to my visa?",
        "a": "It depends on the outcome of the investigation, so prepare your materials even before a decision is made. If there are no charges, keep the notice of the case outcome. If you receive deferred prosecution, a fine, imprisonment, or another disposition, it will show up as a criminal record at your next extension or change review, and sentences related to voice phishing are treated heavily for statuses such as Overseas Korean (F-4) and permanent residency (F-5). Show that you had no intent with materials that reflect the situation at the time, such as the job posting, messenger chats, and remittance instruction records. Even during the investigation, you must apply for an extension of period of stay (체류기간 연장허가) before it expires."
      },
      {
        "id": "vp-student-courier",
        "chip": "Student cash collector",
        "q": "If an international student in Korea took a part-time job delivering large amounts of cash and is investigated as a voice phishing collector, can they continue their studies?",
        "a": "Apart from the criminal outcome, the part-time job done without permission can itself be a problem. If a student does work belonging to another status of stay without permission for activities outside their status, it is punishable under the Immigration Act by up to 3 years of imprisonment or a fine of up to 30 million won, and they can receive a departure recommendation if the violation is minor or become subject to deportation otherwise. Prepare enrollment and transcript certificates, materials on how you were recruited for the job, and a letter of apology to explain what happened. To continue your studies, the first thing is not to miss the deadline for your extension application."
      },
      {
        "id": "vp-deportation-objection",
        "chip": "Objection after release",
        "q": "I served a prison sentence as a voice phishing collector and received a deportation order on release in Korea — can I file an objection?",
        "a": "Yes. A person sentenced to imprisonment without labor or heavier and released can become subject to deportation, and you can submit an objection to the Minister of Justice through the head of the immigration office with jurisdiction within 7 days of receiving the deportation order. In the objection, describe concretely how you became involved and your role, your restitution, and your family ties and life in Korea, and attach the judgment and supporting documents. If you are in protection (보호), also consider applying for temporary release from protection (보호의 일시해제)."
      },
      {
        "id": "vp-protection-release",
        "chip": "Family applying for release",
        "q": "Can I pay a deposit and apply for temporary release for a family member held in a Korean immigration detention center over a voice phishing case?",
        "a": "Yes. A guarantor or similar person of the person in protection can also apply to the Foreigner Protection Committee for temporary release from protection, and if it is granted, conditions are attached, such as a deposit of up to 20 million won, a residence restriction, regular reporting, and designation of a guarantor. Prepare a letter of guarantee, the guarantor's employment and income documents, proof of residence, and materials showing why temporary release is needed, such as illness or family circumstances. If the conditions are violated, for example by fleeing or failing to comply with an appearance order without good reason, the temporary release can be cancelled and all or part of the deposit can be forfeited to the national treasury."
      },
      {
        "id": "vp-f5-permanent",
        "chip": "Permanent residency after punishment",
        "q": "When can I apply for Korean permanent residency (F-5) after being punished for a voice phishing case?",
        "a": "The criteria differ by type of permanent residency, but the good conduct requirement restricts it for a considerable period. For example, for K-STAR permanent residency (F-5-S1), 5 years must pass from the date an actual sentence of imprisonment without labor or heavier was completed or exempted, or from the date a suspended sentence became final, and for a fine, 3 years must pass from the payment date. Having been sentenced abroad for voice phishing also restricts permanent residency (F-5) on the grounds that the good conduct requirement is not met. Check the starting date accurately with the judgment and records showing the sentence has ended, then decide when to apply."
      },
      {
        "id": "vp-reentry",
        "chip": "Visa after deportation",
        "q": "Can someone deported for voice phishing get a Korean visa again?",
        "a": "If 5 years have not passed since leaving after a deportation order, you can be subject to an entry ban, and even after that, whether entry restrictions apply and for how long is decided case by case. Statuses such as Overseas Korean (F-4) and permanent residency (F-5) restrict voice phishing sentences under separate criteria, so even if the restriction is lifted, you need to check separately whether you can receive the status you want. The request to lift the ban should include records showing the sentence has ended, records of restitution, and the family or humanitarian reasons you need to come to Korea, with supporting documents. Processing time depends on the authority with jurisdiction."
      },
      {
        "id": "vp-departure-deadline-delay",
        "chip": "Postponing departure",
        "q": "I received a departure order in Korea after a voice phishing case — can I postpone my departure deadline?",
        "a": "Yes, if there is an unavoidable reason. If it is clear that you cannot leave by the deadline because there is no transportation or because of illness or similar, you can apply to postpone the departure deadline: when there is no transportation, it can be postponed until a period separately set by the Minister of Justice, and in other cases until the reason no longer exists. Apply by submitting an application for postponement of the departure deadline with materials explaining the reason, such as a medical certificate or flight availability. The deadline in the departure order is set within 30 days of the issue date, so you must apply before it passes."
      },
      {
        "id": "vp-opinion-role",
        "chip": "Explaining your involvement",
        "q": "How should I describe how I got involved in my opinion statement for a Korean immigration offense review for voice phishing?",
        "a": "The key is to write in chronological order, from how you were recruited to when you stopped, with the facts matching the supporting documents. Describe in turn which ad or referral led you to start the work, the instructions and payment you received, when you realized it was a crime, and what you did afterward, such as reporting or repaying, and attach messenger chats and account records. Downplaying your role or writing something different from the judgment will cost you credibility, so base it on the facts established in the judgment. Before signing the statement record prepared at your appearance, also check that nothing in it conflicts with your opinion statement."
      },
      {
        "id": "vp-overseas-visa",
        "chip": "Punished abroad",
        "q": "I was punished in my home country for taking part in a voice phishing ring — can I get a residence visa in Korea?",
        "a": "Depending on the status, it will not be permitted for a long time. For a person sentenced abroad for voice phishing, visa issuance and change of status for Overseas Korean (F-4) are not permitted for 7 years from the sentencing date, and permanent residency (F-5) is restricted on the grounds that the good conduct requirement is not met. Points-based talented residence (F-2-7) and K-STAR residence (F-2-7S), among others, also treat a sentence abroad for voice phishing as a disqualification. Check the sentencing date and sentence with your overseas criminal record certificate and a translated copy of the judgment, then calculate when you can apply."
      }
    ],
    "terms": [
      {
        "term": "Socially serious crimes (사회적 중대범죄)",
        "def": "A classification used in stay reviews that groups drugs, voice phishing, and repeat (3 or more times) drunk driving, used for purposes such as restricting the granting of Overseas Korean (F-4) status."
      },
      {
        "term": "Permission for activities outside one's status of stay (체류자격 외 활동허가)",
        "def": "Permission from the Minister of Justice that a foreigner staying in Korea must obtain in advance to engage in activities belonging to another status of stay alongside the activities of their own status."
      },
      {
        "term": "Departure recommendation (출국권고)",
        "def": "A recommendation by the head of the immigration office to leave voluntarily, for example when a violation of the status of stay or scope of activities is minor. The departure deadline can be set within 5 days of the date the recommendation is issued."
      },
      {
        "term": "Cancellation of temporary release from protection (보호 일시해제의 취소)",
        "def": "A measure under which, if a temporarily released person violates the conditions, for example by fleeing or failing to comply with an appearance order without good reason, the release can be cancelled, the person placed back in protection, and the deposit forfeited to the national treasury."
      },
      {
        "term": "Postponement of the departure deadline (출국기한 유예)",
        "def": "Extending the departure deadline for a person who received a departure recommendation, a departure order, or a notice denying a stay permit, when it is clear they cannot leave by the deadline for an unavoidable reason such as no transportation or illness."
      },
      {
        "term": "Overseas criminal record certificate (해외 범죄경력증명서)",
        "def": "A criminal record certificate issued by the country of nationality or residence, required for many long-term status applications."
      }
    ],
    "clients": [
      "International students investigated after a part-time job delivering large amounts of cash",
      "Foreign workers investigated by the police for lending a bank account who are facing an extension",
      "Guarantors seeking temporary release for a family member held in an immigration detention center over a voice phishing case",
      "Family members in Korea of foreigners who finished a prison term and received a deportation order",
      "Overseas Koreans checking when they can apply for F-4 or F-5 because of a past criminal record"
    ]
  },
  "unauthorized-employment": {
    "serviceName": "Administrative Support for Immigration Offense Reviews and Fines Involving Unauthorized Employment of Foreign Nationals",
    "serviceType": "Preparing for immigration investigations, drafting statements for immigration fines, and filing employment-related stay permit applications",
    "coreAnswer": "Under the Immigration Act, both a foreign national who works without a status of stay that permits employment and the employer who hires them can face up to 3 years in prison or a fine of up to 30 million won, and depending on the outcome of the immigration office's investigation, the case may end in a notice of disposition / fine notice (통고처분), a departure order, or deportation. If you are looking for an administrative agent in Korea for unauthorized employment cases, our office prepares and submits the documents for the investigation as well as the paperwork for immigration fines and stay permits.",
    "servicesHeading": "What our administrative agents handle in unauthorized work and illegal hiring cases",
    "services": [
      {
        "name": "Preparing documents for employers facing an immigration investigation over illegal hiring",
        "href": "#ue-employer-penalty"
      },
      {
        "name": "Drafting statements requesting a reduction of an immigration fine",
        "href": "#ue-notice-payment"
      },
      {
        "name": "Reviewing the invitation restriction period and filing for a Certificate for Confirmation of Visa Issuance (사증발급인정서)",
        "href": "#ue-employer-invite-ban"
      },
      {
        "name": "Filing applications for permission to change or add a workplace",
        "href": "#ue-unauthorized-transfer"
      },
      {
        "name": "Filing for permission to engage in activities outside the status of stay (part-time work) for D-2 students",
        "href": "#ue-student-delivery"
      },
      {
        "name": "Reviewing F-4 employment restrictions and filing for permission to engage in activities outside the status of stay",
        "href": "#ue-f4-simple-labor"
      },
      {
        "name": "Drafting explanatory materials (statement of circumstances, letter of apology) for an immigration offense review",
        "href": "#ue-e9-sideline"
      },
      {
        "name": "Filing for an extension of period of stay (체류기간 연장허가) after an immigration fine",
        "href": "#ue-stay-after-fine"
      },
      {
        "name": "Drafting a request to defer the departure deadline under a departure order",
        "href": "#ue-tourist-work"
      },
      {
        "name": "Checking immigration fine amounts and the payment process",
        "href": "/fines"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreign nationals who worked without a work-eligible status or outside their designated workplace, and the employers and brokers who hired or placed them"
      },
      {
        "label": "Requirements",
        "value": "Working or hiring without eligibility carries up to 3 years in prison or a fine of up to 30 million won; working without permission to change or add a workplace, and hiring such a worker, carries up to 1 year in prison or a fine of up to 10 million won. After an investigation, a fine notice may be issued."
      },
      {
        "label": "Process",
        "value": "Crackdown or report → immigration investigation (summons and questioning) → fine notice or criminal referral → for the foreign national, a decision on a departure order, deportation, or continued stay"
      },
      {
        "label": "Documents",
        "value": "Employment contract and wage payment records, records confirming status of stay such as a copy of the residence card, business registration certificate, statement of circumstances"
      },
      {
        "label": "Timeline",
        "value": "An immigration fine must be paid within 15 days of receiving the notice; other processing times depend on the immigration office in charge."
      }
    ],
    "situations": [
      {
        "id": "ue-employer-penalty",
        "chip": "Employer penalties",
        "q": "What penalties does an employer in Korea face for hiring a foreign worker illegally?",
        "a": "Anyone who hires a foreign national without a work-eligible status of stay faces up to 3 years in prison or a fine of up to 30 million won under the Immigration Act, and when an employee did the hiring in the course of business, the company or the individual business owner can also be fined (unless they exercised due care and supervision). If the investigation confirms the offense, the immigration office can issue an immigration fine (범칙금); paying it within 15 days of receiving the notice means you will not be punished again for the same case, while failing to pay leads to a criminal referral. If the offense is serious enough to warrant imprisonment or heavier, it is referred to prosecutors immediately without a fine notice. For the investigation, prepare the employment contract, wage payment records, and records showing you checked the worker's status of stay at hiring."
      },
      {
        "id": "ue-employer-invite-ban",
        "chip": "Re-invitation limits",
        "q": "Can a company that paid a fine for illegally hiring foreigners in Korea invite foreign workers again?",
        "a": "A Certificate for Confirmation of Visa Issuance may be withheld for a certain period. If the company received and paid a criminal fine or immigration fine of 5 million won or more for illegal hiring, the certificate may be refused until 3 years have passed from the payment date, or 1 year if the amount was under 5 million won; for a prison sentence or a suspended sentence, the 3-year standard applies. The period may be set shorter after considering the risk of reoffending and the motive and consequences of the violation. Businesses whose visa sponsorship is restricted because of past penalties for illegal hiring also cannot employ international students for part-time work."
      },
      {
        "id": "ue-unauthorized-transfer",
        "chip": "Unapproved workplace change",
        "q": "If I have an E-9 worker from another company work for me without permission, can I as the employer be punished too?",
        "a": "Yes, you can. Anyone who hires a foreign national who has not obtained permission to change or add a workplace faces up to 1 year in prison or a fine of up to 10 million won, and the corporate liability provision can also apply to the company or individual business owner. The worker who changed or added a workplace without permission faces the same penalty and may also be subject to deportation. Before they start working with you, check the worker's residence card and the scope of their permit, and if needed, apply for permission to change or add a workplace first."
      },
      {
        "id": "ue-broker",
        "chip": "Job brokering",
        "q": "Can someone who found a job for an undocumented foreigner in Korea be punished?",
        "a": "Yes. Brokering or soliciting the employment of a foreign national without a work-eligible status as a business carries up to 3 years in prison or a fine of up to 30 million won, and even one-off brokering or soliciting not done as a business carries a fine of up to 5 million won. Keeping such a foreign national under your control for the purpose of brokering employment also carries up to 3 years in prison or a fine of up to 30 million won, and a broker who is a foreign national may be subject to deportation. If you are investigated, organize materials showing how the referral happened, whether you received payment, and whether it was repeated, and give a truthful statement."
      },
      {
        "id": "ue-tourist-work",
        "chip": "Working on a short-term stay",
        "q": "What happens if I enter Korea on a tourist (B-2) or visa waiver (B-1) and get caught working?",
        "a": "You worked without a work-eligible status of stay, so you face up to 3 years in prison or a fine of up to 30 million won and are subject to deportation. Depending on the investigation, you may receive a fine notice and leave voluntarily under a departure order (출국명령), or you may receive a deportation order (강제퇴거명령). A person who intends to leave voluntarily at their own expense may qualify for a departure order, so prepare your passport, a return flight reservation, and proof of your address and contact details. If you leave under a deportation order, you may be barred from entering Korea until 5 years have passed."
      },
      {
        "id": "ue-student-delivery",
        "chip": "Student delivery rider",
        "q": "Is it illegal work for an international student (D-2) in Korea to work as a delivery app rider?",
        "a": "It can be illegal work, because this is not work that can be permitted. For student part-time work, activities as special-type workers such as parcel couriers, delivery agency riders, and insurance agents are designated as restricted fields. Engaging in activities belonging to another status of stay without permission carries up to 3 years in prison or a fine of up to 30 million won, and a minor violation may lead to a departure recommendation while a more serious one may lead to deportation. If you have already worked, organize your work period, income records, and enrollment and transcript certificates to explain the circumstances, and consider obtaining a new part-time work permit for an allowed field."
      },
      {
        "id": "ue-notice-payment",
        "chip": "Paying the fine",
        "q": "I received an immigration fine notice for illegal work in Korea — when and how do I have to pay it?",
        "a": "You must pay it at a designated collection institution (such as a national treasury bank or post office) within 15 days of receiving the notice; credit cards are accepted, but installment payments are not. If you do not pay within the period, you will be referred to prosecutors, but paying before the referral prevents it. Paying the fine as notified means you will not be punished again for the same case. The fine can be reduced by up to one half of the standard amount considering your age, circumstances, the motive and consequences of the violation, and your ability to pay, so it is important to document these circumstances during the investigation before the notice is issued."
      },
      {
        "id": "ue-stay-after-fine",
        "chip": "Staying after a fine",
        "q": "If I pay the immigration fine for illegal work, can I keep working in Korea?",
        "a": "Paying the fine does not secure your stay. If departure is deemed appropriate after the notice of disposition, you may receive a departure order, and even if you remain, your fine history will be reviewed in later extension or change applications. For example, the job-seeker (D-10) status is restricted if the fine was 5 million won or more for a first offense, or 7 million won or more combined over the last 3 years for repeat offenses, and the overseas Korean (F-4) status is restricted for 3 years from the full payment date once the total fines reach 7 million won or more (reduced to 1 year if 100 or more hours of volunteer work over at least 6 months is confirmed). Keep your fine payment receipt, your statement of circumstances, and documents showing your current lawful employment together."
      },
      {
        "id": "ue-e9-sideline",
        "chip": "Work outside designated site",
        "q": "What happens if an E-9 worker in Korea works on weekends somewhere other than their designated workplace?",
        "a": "Working somewhere other than the designated workplace carries up to 1 year in prison or a fine of up to 10 million won, and the worker may also be subject to deportation. The employer who had them work is also liable for hiring a foreign national without permission to change or add a workplace. During the investigation, state truthfully your work period, the wages you received, and your work at the original workplace, and prepare a certificate of employment from the original workplace. If you receive a fine notice, you must pay within 15 days of receiving it."
      },
      {
        "id": "ue-f4-simple-labor",
        "chip": "F-4 simple labor",
        "q": "Is it illegal work for an overseas Korean (F-4) to do simple labor such as day jobs at construction sites?",
        "a": "Simple labor falls within the employment restrictions for overseas Koreans (F-4) and can be a violation. F-4 holders cannot work in simple labor, in activities contrary to good morals such as gambling-type businesses, or in other cases where restrictions are needed for the public interest or labor market order, and violating these restrictions makes them subject to offense proceedings. Those who wish to keep working at a workplace where they previously filed an employment start report under the visit-and-work (H-2) status can obtain permission to engage in activities outside their status of stay. If you are worried about a violation, organize your employment contract and actual job duties and first check whether the occupation falls within the restricted range."
      }
    ],
    "terms": [
      {
        "term": "Restrictions on employing foreign nationals (외국인 고용의 제한)",
        "def": "The principle that a foreign national may work only with a status of stay that permits employment, and that no one may hire, broker, or solicit the employment of a person without such status."
      },
      {
        "term": "Notice of disposition / fine notice (통고처분)",
        "def": "A disposition in which the head of the regional immigration office, after obtaining conclusive evidence of an offense through investigation, notifies the offender in writing, with reasons, to pay an immigration fine at a designated place."
      },
      {
        "term": "Immigration fine (범칙금)",
        "def": "An amount equivalent to a criminal fine that must be paid under a notice of disposition within 15 days of receiving the notice; paying as notified means no further punishment for the same case."
      },
      {
        "term": "Corporate liability provision (양벌규정)",
        "def": "A rule under which, when an employee of a company or individual commits a violation such as illegal hiring in the course of business, the company or individual is fined in addition to the offender, unless due care and supervision were exercised."
      },
      {
        "term": "Permission to change or add a workplace (근무처의 변경·추가 허가)",
        "def": "Permission from the Minister of Justice that a foreign national must obtain in advance to change or add a workplace within their status of stay; for some professionals, a report within 15 days replaces it."
      },
      {
        "term": "Permission for activities outside the status of stay (체류자격 외 활동허가)",
        "def": "Permission a foreign national must obtain in advance to engage in activities belonging to another status of stay alongside the activities of their own status."
      },
      {
        "term": "Integrated standards for restricting stay permits (체류허가 제한 통합기준)",
        "def": "Standards that restrict stay permits for people who received immigration fines for Immigration Act violations; in job-seeker (D-10) reviews, fines of 5 million won or more for a first offense, or 7 million won or more combined over the last 3 years for repeat offenses, are used as restriction thresholds."
      }
    ],
    "clients": [
      "Restaurant and factory owners facing an illegal hiring investigation after an immigration crackdown",
      "Companies checking when they can invite foreign workers again after an immigration fine",
      "International students investigated for working outside their status through delivery side jobs",
      "Non-professional employment (E-9) workers caught working outside their designated workplace",
      "Overseas Koreans (F-4) checking whether a job falls within restricted occupations"
    ]
  },
  "overstay": {
    "serviceName": "Administrative Support for Immigration Fines and Departure Orders for Foreign Nationals Who Overstayed",
    "serviceType": "Drafting explanatory materials for overstay offense reviews and filing departure-related applications",
    "coreAnswer": "Staying past your permitted period without an extension of period of stay (체류기간 연장허가) carries up to 3 years in prison or a fine of up to 30 million won under the Immigration Act and makes you subject to deportation, and the immigration office decides on an immigration fine notice together with a departure order or deportation based on its investigation. If you need an administrative agent in Korea for an overstay case, our office prepares your voluntary visit to immigration, drafts materials supporting a fine reduction, and files the documents related to your departure deadline.",
    "servicesHeading": "What our administrative agents handle in overstay offense reviews",
    "services": [
      {
        "name": "Drafting explanatory materials (statement of circumstances) for an overstay offense review",
        "href": "#os-self-visit"
      },
      {
        "name": "Drafting materials explaining grounds for reducing an immigration fine",
        "href": "#os-hospital-reason"
      },
      {
        "name": "Filing applications for an extension of period of stay",
        "href": "#os-extension-deadline"
      },
      {
        "name": "Drafting a request to defer the departure deadline after an extension is refused",
        "href": "#os-refused-extension"
      },
      {
        "name": "Preparing documents on departure order performance bonds and departure deadlines",
        "href": "#os-departure-order"
      },
      {
        "name": "Filing alien registration applications",
        "href": "#os-registration-90days"
      },
      {
        "name": "Filing applications for granting status of stay to children born in Korea",
        "href": "#os-child-born"
      },
      {
        "name": "Drafting applications for temporary release from protection and guarantor documents",
        "href": "#os-protection-family"
      },
      {
        "name": "Drafting requests to lift entry restrictions",
        "href": "#os-reentry-after"
      },
      {
        "name": "Checking immigration fine amounts and the payment process",
        "href": "/fines"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreign nationals who stayed past their period of stay without an extension, and those who missed the deadline for alien registration or for applying for status of stay for a child born in Korea"
      },
      {
        "label": "Requirements",
        "value": "Overstaying carries up to 3 years in prison or a fine of up to 30 million won and makes you subject to deportation; after an investigation, a fine notice and a departure order may be issued together."
      },
      {
        "label": "Process",
        "value": "Voluntary visit or crackdown → investigation → fine notice → departure order (with a departure deadline) or deportation order → departure"
      },
      {
        "label": "Documents",
        "value": "Passport, residence card, records explaining why you overstayed (medical certificate, hospitalization certificate, etc.), return flight reservation"
      },
      {
        "label": "Timeline",
        "value": "The immigration fine is due within 15 days of receiving the notice; the departure deadline under a departure order is set within 30 days of issuance; after an extension is refused, the departure deadline is set within 14 days of the notice date."
      }
    ],
    "situations": [
      {
        "id": "os-self-visit",
        "chip": "Visiting after overstaying",
        "q": "I just realized my visa expired in Korea — what happens if I go to the immigration office myself first?",
        "a": "The immigration office in charge will investigate the violation and then issue an immigration fine notice, and if departure is deemed appropriate, it will also issue a departure order. Once you receive the notice, you must pay the fine within 15 days, and paying as notified means you will not be punished again for the same case. When you visit, bring your passport, residence card, and records showing why you overstayed (a medical certificate, flight cancellation confirmation, etc.). If you receive a departure order, you must leave by the deadline stated on it."
      },
      {
        "id": "os-hospital-reason",
        "chip": "Unavoidable reasons",
        "q": "I overstayed my visa in Korea because I was hospitalized and couldn't apply for an extension — will they take that into account?",
        "a": "Your circumstances are considered when the disposition is decided. The immigration fine can be reduced by up to one half of the standard amount considering your age and circumstances, the motive and consequences of the violation, your ability to pay, and the number of violations, and the Minister of Justice may even waive the fine notice altogether in light of the circumstances. Prepare records whose dates match the period you could not apply and the reason, such as a hospitalization certificate, medical certificate, and medical bill receipts. It is best to submit them to the office as soon as you learn of the violation."
      },
      {
        "id": "os-extension-deadline",
        "chip": "Applying on expiry day",
        "q": "Can I still apply to extend my Korea visa on the day it expires?",
        "a": "An extension application must be filed before your period of stay ends, so once the expiry date passes it is too late. Applying right before expiry leaves no time to respond to requests for additional documents, so it is safer to apply early. If the period has already passed, the matter moves to a violation investigation rather than an extension application, and overstaying carries up to 3 years in prison or a fine of up to 30 million won. When applying, have the application form, passport, residence card, proof of address, and the documents required for your status of stay ready."
      },
      {
        "id": "os-refused-extension",
        "chip": "Leaving after refusal",
        "q": "My visa extension in Korea was refused — by when do I have to leave the country?",
        "a": "You must leave by the departure deadline stated in the refusal notice, which is set within 14 days of the notice date or may be set as your original expiry date. Missing that deadline makes you an overstayer. If illness or transportation problems prevent you from leaving in time, you can apply to defer the departure deadline, and if you may be able to change to another status of stay, you need to look into it before the deadline. First check the reason for refusal and decide whether it is something you can fix."
      },
      {
        "id": "os-departure-order",
        "chip": "Departure order deadline",
        "q": "I received a departure order in Korea for overstaying — how is the departure deadline decided?",
        "a": "The departure deadline is set within 30 days of the date the departure order is issued, and conditions such as a residence restriction may be attached. If deemed necessary, you may be required to deposit a performance bond of up to 20 million won, taking into account the reason and motive for the order, your violation history, age, circumstances and assets, flight risk, and humanitarian reasons. If you do not leave by the deadline or breach the conditions, a deportation order is issued without delay and the bond may be forfeited to the state. Keep your flight reservation and departure order, and if an unavoidable problem arises, apply for a deferral before the deadline."
      },
      {
        "id": "os-reentry-after",
        "chip": "Re-entry after leaving",
        "q": "If I leave Korea voluntarily after overstaying for a long time, can I come back later?",
        "a": "It depends on how you left. If you leave under a deportation order, you may be barred from entering until 5 years have passed, but leaving within the deadline under a departure order does not automatically fall under this statutory entry ban. However, whether an entry restriction applies and for how long can be decided separately case by case, and your stay history will also be checked in later visa reviews. Keeping your fine payment receipt and departure order will give you supporting documents if you later request that an entry restriction be lifted."
      },
      {
        "id": "os-registration-90days",
        "chip": "Late alien registration",
        "q": "It has been more than 90 days since I entered Korea and I haven't registered as a foreigner — is that treated the same as overstaying?",
        "a": "It is a different violation. A foreign national who intends to stay longer than 90 days must complete alien registration within 90 days of entry; failing to do so carries up to 1 year in prison or a fine of up to 10 million won and is also a ground for deportation. If your period of stay has not expired, it is not overstaying, but late registration can still lead to offense proceedings. Gather your passport, photo, proof of address, and records explaining the delay, and apply for registration right away."
      },
      {
        "id": "os-child-born",
        "chip": "Child born in Korea",
        "q": "If I apply late for status of stay for my foreign child born in Korea, does the child become an illegal resident?",
        "a": "Missing the deadline can mean the child stayed without a status of stay. A foreign national born in Korea must obtain a status of stay within 90 days of birth, and staying in violation of this carries up to 3 years in prison or a fine of up to 30 million won and is also a ground for deportation. Apply within the deadline with the birth certificate, the parents' passports and residence cards, and documents confirming the family relationship. If the deadline has already passed, it is best to apply immediately with materials explaining the delay."
      },
      {
        "id": "os-fine-unpaid",
        "chip": "Unpaid fine",
        "q": "What happens if I can't afford to pay my overstay fine in Korea?",
        "a": "If you do not pay within 15 days of receiving the notice, you may be referred to prosecutors and the matter moves into criminal proceedings; paying before the referral prevents it. The fine cannot be paid in installments, but it can be paid by credit card and similar means. If a deportation order has been issued, there is no criminal referral even if the fine is unpaid. If affordability is the issue, it is important to submit income and asset records during the investigation before the notice is issued so that your situation is known."
      },
      {
        "id": "os-protection-family",
        "chip": "Family in detention",
        "q": "My family member was caught overstaying and is in an immigration detention center in Korea — what can I do?",
        "a": "A guarantor or similar person can apply to the Foreigner Protection Committee for temporary release from protection (보호의 일시해제), and if granted, a deposit of up to 20 million won and conditions such as a residence restriction and regular reporting are attached. If a deportation order was issued, an objection can be filed within 7 days of receiving the order, so check that deadline first. Prepare a letter of guarantee, family relationship documents, proof of residence, and records showing why temporary release is needed, such as illness or childcare. If there is no passport or no transportation arranged, repatriation can be delayed and detention prolonged, so check the passport status as well."
      }
    ],
    "terms": [
      {
        "term": "Extension of period of stay (체류기간 연장허가)",
        "def": "Permission from the Minister of Justice that a foreign national must apply for and obtain before their period of stay ends in order to remain beyond it."
      },
      {
        "term": "Notice of disposition / fine notice (통고처분)",
        "def": "A disposition in which the head of the regional immigration office, after obtaining conclusive evidence of an offense through investigation, notifies the offender in writing to pay an immigration fine at a designated place."
      },
      {
        "term": "Immigration fine reduction (범칙금 경감)",
        "def": "Reducing the standard immigration fine by up to one half considering the offender's age and circumstances, the motive and consequences of the violation, ability to pay, and the number of violations."
      },
      {
        "term": "Departure order document (출국명령서)",
        "def": "The written order issued with a departure order, stating a departure deadline within 30 days of issuance and conditions such as a residence restriction."
      },
      {
        "term": "Alien registration (외국인등록)",
        "def": "Registration that a foreign national intending to stay more than 90 days from entry must complete within 90 days with the head of the regional immigration office having jurisdiction over their address."
      },
      {
        "term": "Granting of status of stay (체류자격 부여)",
        "def": "A status of stay that a foreign national who came to be in Korea without one, such as a person born in Korea, must obtain within a set period, such as 90 days from birth."
      },
      {
        "term": "Temporary release from protection (보호의 일시해제)",
        "def": "Temporarily releasing a person from protection, with a deposit of up to 20 million won and conditions, considering the detainee's circumstances, the reasons for the request, and their assets."
      }
    ],
    "clients": [
      "Foreign workers who only later realized they had missed their expiry date",
      "Long-term residents who missed the extension window because of hospital treatment",
      "Foreign nationals who received an extension refusal and need to adjust their departure deadline",
      "Foreign parents who missed the deadline to apply for status of stay for a child born in Korea",
      "Guarantors seeking temporary release for a family member held in an immigration detention center after a crackdown"
    ]
  },
  "false-documents": {
    "serviceName": "Administrative Support for Immigration Offense Reviews and Permit Cancellations Involving False or Forged Documents",
    "serviceType": "Preparing for immigration investigations and drafting explanatory materials for permit cancellation hearings",
    "coreAnswer": "Submitting forged or altered documents or a false application when applying for a permit such as a change or extension of status of stay, activities outside the status of stay, or a workplace change carries up to 3 years in prison or a fine of up to 30 million won under the Immigration Act, makes a foreign national subject to deportation, and can lead to cancellation of permits already granted. If you are looking for an administrative agent in Korea for a false document case, our office drafts the materials for the investigation and for the hearing held before a permit is cancelled.",
    "servicesHeading": "What our administrative agents handle in false document offense reviews",
    "services": [
      {
        "name": "Preparing to attend and give statements at an immigration investigation over suspected false documents",
        "href": "#fd-investigation-summons"
      },
      {
        "name": "Drafting explanatory materials (statement of circumstances, written opinion) for an immigration offense review",
        "href": "#fd-forged-diploma"
      },
      {
        "name": "Preparing materials for the opinion hearing before a stay permit is cancelled",
        "href": "#fd-forged-diploma"
      },
      {
        "name": "Filing corrections to application entries and drafting a statement of circumstances",
        "href": "#fd-false-entry-fine"
      },
      {
        "name": "Preparing materials proving a genuine marriage for marriage migrants (F-6)",
        "href": "#fd-sham-marriage"
      },
      {
        "name": "Reviewing how long an inviter is restricted from obtaining a Certificate for Confirmation of Visa Issuance",
        "href": "#fd-fake-invitation"
      },
      {
        "name": "Reviewing disqualifying grounds for a change of status of stay (체류자격 변경허가) to residence (F-2)",
        "href": "#fd-past-false-points"
      },
      {
        "name": "Submitting corrected translated documents",
        "href": "#fd-translation-error"
      },
      {
        "name": "Drafting and filing objections to a deportation order",
        "href": "/dispositions/deportation-order"
      },
      {
        "name": "Drafting requests to lift entry restrictions",
        "href": "#fd-reapply"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreign nationals who submitted forged, altered, or false documents in a permit application, inviters who made false invitations or guarantees, and those who brokered or encouraged this"
      },
      {
        "label": "Requirements",
        "value": "Submitting false documents in a permit application and making false invitations or visa applications carry up to 3 years in prison or a fine of up to 30 million won; the foreign national becomes subject to deportation, and permits obtained by deception can be cancelled. Other false entries in applications or reports carry an administrative fine (과태료) of up to 500,000 won."
      },
      {
        "label": "Process",
        "value": "Verification of documents → summons and questioning → fine notice or criminal referral → decision on permit cancellation (after an opinion hearing), departure order, or deportation"
      },
      {
        "label": "Documents",
        "value": "Originals of the documents submitted, confirmation from the issuing institution, records of how the documents were prepared (contracts, receipts, message logs), and evidence of the actual facts"
      },
      {
        "label": "Timeline",
        "value": "Varies by immigration office; notice of a permit cancellation hearing is given at least 7 days before the hearing date, and an immigration fine is paid within 15 days of receiving the notice."
      }
    ],
    "situations": [
      {
        "id": "fd-forged-diploma",
        "chip": "Forged degree found",
        "q": "Will my Korean work visa be cancelled if it later turns out it was obtained with a forged diploma?",
        "a": "It can be cancelled. If it is found that a permit was obtained by deception or other improper means, the visa or stay permit can be cancelled or changed, and using forged documents or making a false application, whether for a visa or a stay permit, carries up to 3 years in prison or a fine of up to 30 million won and makes the foreign national subject to deportation. If an opinion hearing is held before cancellation, you are notified of the reasons and the hearing date, time, and place at least 7 days in advance, and once the permit is cancelled you may be subject to a departure order. Organize records of how you obtained the degree, correspondence with the school, and contracts and message logs with any agency that prepared the documents."
      },
      {
        "id": "fd-false-entry-fine",
        "chip": "False entry on a form",
        "q": "If I wrote something untrue on an immigration application in Korea, will I always face criminal punishment?",
        "a": "It depends. Using improper means such as submitting forged documents or a false application in a permit application, such as a change or extension of status of stay or a workplace change, carries up to 3 years in prison or a fine of up to 30 million won, but entering false facts in other kinds of applications or reports carries an administrative fine of up to 500,000 won. If it was a simple mistake, file a correction right away and attach materials explaining how the error happened to show it was not a deliberate falsehood. If you have already received an investigation notice, organize the original documents and how they were prepared before attending."
      },
      {
        "id": "fd-fake-invitation",
        "chip": "False invitation",
        "q": "If someone invites a foreigner to Korea with a fake invitation letter or false guarantee, can the inviter be punished too?",
        "a": "Yes. Inviting a foreign national by improper means such as stating false facts or giving a false guarantee, or brokering such an invitation or visa application, carries up to 3 years in prison or a fine of up to 30 million won, and the company or business owner may also be fined. A foreign national who entered this way becomes subject to deportation, and after being penalized the inviter may be restricted from obtaining a Certificate for Confirmation of Visa Issuance for a certain period (3 years from payment for a criminal fine or immigration fine of 5 million won or more, 1 year if less). Organize the documents you checked at the time of the invitation and materials showing the circumstances to prepare for the investigation."
      },
      {
        "id": "fd-sham-marriage",
        "chip": "Suspected sham marriage",
        "q": "What happens if I'm investigated for a suspected sham marriage on a Korean marriage visa (F-6)?",
        "a": "An investigation is carried out to confirm whether the marriage is genuine, and if it is found the permit was obtained by deception, the stay permit can be cancelled. A false invitation or false visa application carries up to 3 years in prison or a fine of up to 30 million won, and a foreign national who entered this way is subject to deportation. If you are actually living together as a married couple, prepare photos together, proof of cohabitation, records of living expense transfers and shared spending, and statements from family and neighbors to explain your situation. If an opinion hearing is held before cancellation, you are notified at least 7 days before the hearing date."
      },
      {
        "id": "fd-employment-cert",
        "chip": "False employment certificate",
        "q": "If the employment certificate my company issued for my Korea visa extension was inaccurate, can the company get in trouble too?",
        "a": "It can. Not only submitting forged, altered, or false documents in a permit application, but also brokering or encouraging that act, is prohibited, and violations carry up to 3 years in prison or a fine of up to 30 million won. The foreign national may become subject to deportation, and the permit granted may be cancelled. Start by establishing the facts with an employment contract, salary transfer records, and social insurance records showing your actual work period and pay."
      },
      {
        "id": "fd-other-passport",
        "chip": "Someone else's passport",
        "q": "What happens if it comes out that I entered Korea using someone else's passport?",
        "a": "This can be treated as entering without a valid passport and visa, which carries up to 3 years in prison or a fine of up to 30 million won and makes you subject to deportation. In some status of stay reviews, a person who used a forged or altered passport is treated the same as an illegal resident and excluded from changing status. In the investigation, the starting point for everything that follows is presenting home-country identity documents that confirm your real identity and truthfully explaining how you entered. If you receive a deportation order, you can file an objection within 7 days of receiving the order."
      },
      {
        "id": "fd-past-false-points",
        "chip": "Past false documents",
        "q": "I submitted false documents 2 years ago — can I still apply for a residence (F-2) visa in Korea now?",
        "a": "Depending on the status, it is a disqualifying ground. Statuses such as points-based talent residence (F-2-7) and K-STAR residence (F-2-7S) treat submitting false documents at the time of application or within the last 3 years before the application date as a disqualifying ground. Even after 3 years, any immigration fine or criminal fine you received for it is reviewed separately under the standards for restricting stay permits. Check the dates using the disposition notice and payment receipt from that time, then decide when to apply."
      },
      {
        "id": "fd-translation-error",
        "chip": "Translation error fix",
        "q": "There was a mistranslation in the translated documents I submitted to Korean immigration and I'm worried it will be treated as a false document — what should I do?",
        "a": "As soon as you find the mistranslation, the priority is to submit the original and a corrected translation and explain what happened. What is penalized as false document submission is applying by improper means, such as submitting forged or altered documents or an application with false content, so you need to show with the original and a translator's confirmation that the difference between the original and the translation was a simple error. If the permit has already been granted, check whether the mistranslation affected the content of the permit and consider filing a correction. If you have received an investigation notice, attend with the original documents."
      },
      {
        "id": "fd-reapply",
        "chip": "Reapplying after leaving",
        "q": "Can I apply for a Korean visa again after leaving the country over a false document issue?",
        "a": "It depends on how you left. If you left under a deportation order, you may be barred from entering until 5 years have passed; if you left under a departure order, this does not automatically fall under that statutory entry ban, but whether an entry restriction applies can be decided separately. Your previous history will be checked when you reapply, so apply truthfully and prepare materials on the circumstances of the problem documents and on how you complied with the disposition afterward. If an entry restriction is confirmed, start by submitting a request to lift it."
      },
      {
        "id": "fd-investigation-summons",
        "chip": "Preparing for questioning",
        "q": "I received an immigration summons in Korea on suspicion of submitting false documents — what should I prepare?",
        "a": "Immigration officers can summon and question you when needed for an investigation, and your statements are recorded in a written record, so organize the facts for each document in advance. Bring the originals of the documents you submitted, confirmation from the issuing institutions, and contracts, receipts, and message logs showing how they were prepared, such as whether you obtained them yourself or used an agency. If you do not speak Korean, an interpreter is provided, and you can read the record before signing and ask for corrections. If you cannot make the scheduled date, contact the office in advance."
      }
    ],
    "terms": [
      {
        "term": "Prohibition on submitting false documents (허위서류 제출 등의 금지)",
        "def": "A rule prohibiting applying by improper means, such as submitting forged or altered documents as supporting evidence or a false application, in permit applications for activities outside the status of stay, workplace changes, or changes and extensions of status of stay, as well as brokering or encouraging such acts."
      },
      {
        "term": "Prohibition on false invitations (허위초청 등의 금지)",
        "def": "A rule prohibiting inviting a foreign national by improper means such as stating false facts or giving a false guarantee, falsely applying for a visa or a Certificate for Confirmation of Visa Issuance, or brokering such acts."
      },
      {
        "term": "Cancellation or change of stay permits (체류허가의 취소·변경)",
        "def": "A disposition by which the Minister of Justice cancels or changes a visa, stay permit, or similar permission, for example when it is found to have been obtained by deception or other improper means."
      },
      {
        "term": "Opinion hearing (의견청취)",
        "def": "A procedure in which the Minister of Justice has the foreign national appear to hear their views when needed before cancelling or changing a permit; the reasons and the hearing date, time, and place must be notified at least 7 days in advance."
      },
      {
        "term": "Administrative fine (과태료)",
        "def": "A monetary sanction imposed and collected by the head of the regional immigration office on persons who, for example, state or report false facts in applications or reports; for false entries it is up to 500,000 won."
      },
      {
        "term": "Suspect interrogation record (용의자신문조서)",
        "def": "A written record of statements taken when an immigration officer questions a suspect; records made in an immigration offense investigation are treated as suspect interrogation records under the Criminal Procedure Act."
      }
    ],
    "clients": [
      "Foreign nationals on work visas summoned over doubts about the authenticity of submitted degree or career documents",
      "Applicants worried that a translation error will be treated as a false document",
      "Marriage migrant (F-6) couples under investigation for a suspected sham marriage",
      "Companies and individuals investigated as inviters on suspicion of false invitations",
      "Long-term residents checking when they can apply for residence (F-2) given a past false document record"
    ]
  },
  "deportation-order": {
    "serviceName": "Administrative Support for Objections to Deportation Orders",
    "serviceType": "Drafting and filing objections to a deportation order",
    "coreAnswer": "If you have received a deportation order (강제퇴거명령), the first thing to do is file an objection with the Minister of Justice, through the head of the regional immigration office, within 7 days of receiving the order. Even if the objection is found to be without merit, a stay may still be permitted if you once held Korean nationality or have special circumstances requiring you to remain in Korea, so documenting those circumstances is key. If you need an administrative agent in Korea for a deportation order objection, our office drafts and files the objection, organizes evidence of your circumstances in Korea, and prepares applications for temporary release from protection.",
    "servicesHeading": "What our administrative agents handle in deportation order objections",
    "services": [
      {
        "name": "Drafting and filing objections to a deportation order",
        "href": "#objection-7-days"
      },
      {
        "name": "Reviewing the deportation order and review decision and identifying the key issues",
        "href": "#read-the-order"
      },
      {
        "name": "Drafting the statement of grounds for objection and supporting materials",
        "href": "#objection-documents"
      },
      {
        "name": "Organizing evidence for special stay permission (past Korean nationality, family ties in Korea)",
        "href": "#family-in-korea"
      },
      {
        "name": "Drafting and filing applications for temporary release from protection (보호의 일시해제)",
        "href": "#release-from-detention"
      },
      {
        "name": "Preparing proof of ability to pay the temporary release deposit",
        "href": "#release-bond"
      },
      {
        "name": "Drafting a request for review of protection (detention)",
        "href": "#detention-review-request"
      },
      {
        "name": "Reviewing whether a permanent resident (F-5) falls under the deportation exceptions",
        "href": "#permanent-resident"
      },
      {
        "name": "Reviewing departure orders and filing requests to defer the departure deadline",
        "href": "/dispositions/departure-order"
      },
      {
        "name": "Drafting requests to lift entry restrictions",
        "href": "/dispositions/entry-ban"
      },
      {
        "name": "Drafting explanatory materials (written opinion, letter of apology, petition) for an immigration offense review",
        "href": "/immigration-offense-review"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreign nationals who received a deportation order after a review found them subject to deportation (for example, for violating their status or period of stay, or after release from a sentence of imprisonment or heavier)"
      },
      {
        "label": "Requirements",
        "value": "After completing the investigation, the head of the regional immigration office must decide that the person is subject to deportation. Permanent residents are deported only in exceptional cases, such as crimes of insurrection or treason, or release after a sentence of 5 years or more of imprisonment for persons specified by Ministry of Justice ordinance."
      },
      {
        "label": "Process",
        "value": "Deportation order issued → objection (via the office head to the Minister of Justice) → Minister of Justice's decision → if the objection has merit, release from protection; if not, repatriation is carried out (with protection if immediate repatriation is not possible)"
      },
      {
        "label": "Documents",
        "value": "Objection form, copy of the deportation order, materials supporting the grounds for objection (history of stay, family relationships, livelihood records, etc.); for temporary release from protection, the application plus materials explaining the reasons and ability to pay the deposit"
      },
      {
        "label": "Timeline",
        "value": "An objection must be filed within 7 days of receiving the deportation order. The law sets no deadline for the Minister of Justice's decision, so it varies by case; the Foreigner Protection Committee decides on temporary release within 3 weeks of receiving the application (extendable once by up to 2 weeks if unavoidable)."
      }
    ],
    "situations": [
      {
        "id": "objection-7-days",
        "chip": "Objection deadline",
        "q": "It has been 5 days since I received a deportation order in Korea — can I still file an objection?",
        "a": "If 7 days have not passed since you received the order, you can still object, so submit it within the remaining days. If the 7 days have already passed, the law has no provision for accepting a late objection, so check immediately with the immigration office in charge whether any other options remain. The objection, with a copy of the deportation order and materials showing the grounds for objection, is submitted to the Minister of Justice through the head of the regional immigration office. The deadline runs from the day you actually received the order, so write down that date first."
      },
      {
        "id": "read-the-order",
        "chip": "Checking the order",
        "q": "I received a deportation order in Korea — what should I check on it first?",
        "a": "A deportation order states the purpose of and reasons for the order and that you may file an objection, so start by checking the reasons section and the date you received it. If the stated reasons are inaccurate or leave out relevant circumstances, that becomes the core argument of your objection. Keep a copy of the order, the materials you submitted during the investigation, and documents showing your history of stay in one place. The objection deadline is 7 days from receiving the order, so review the content and prepare documents at the same time."
      },
      {
        "id": "objection-documents",
        "chip": "Objection attachments",
        "q": "What documents should I attach to an objection against a deportation order in Korea?",
        "a": "The law does not specify required attachments, so the basic approach is to attach materials that rebut the reasons for the order or show why you need to remain in Korea. If you are disputing the violation itself, prepare evidence of the facts; if you admit the facts but are appealing based on your circumstances, focus on family relationship, livelihood, and length-of-stay records. The office head forwards your objection to the Minister of Justice together with the review decision and investigation records, so any claim that differs from the investigation records must be backed by supporting documents. All preparation must be finished within 7 days of receiving the order."
      },
      {
        "id": "special-circumstances",
        "chip": "After a rejection",
        "q": "If my objection to a deportation order in Korea is rejected, is there no way at all to stay?",
        "a": "Even when an objection is found to be without merit, the Minister of Justice may permit you to stay if you once held Korean nationality or have special circumstances requiring you to remain in Korea. Without such circumstances, repatriation proceeds after you are notified of the decision. Even when a stay is permitted, conditions such as a period of stay may be attached. That is why it is wise to submit materials showing special circumstances, such as former nationality records and family relationship documents, from the objection stage."
      },
      {
        "id": "family-in-korea",
        "chip": "Family in Korea",
        "q": "If a foreigner with a Korean spouse and children gets a deportation order, will family circumstances be considered?",
        "a": "Family circumstances are a typical example of the 'special circumstances requiring a stay in Korea' on which the Minister of Justice can permit a stay. However, having family does not by itself decide the outcome; it is weighed together with the nature of the violation. Attach to your objection a family relationship certificate and marriage certificate, housing records showing you live together, and records of childcare and financial support. It must be submitted within the objection deadline of 7 days after receiving the order."
      },
      {
        "id": "release-from-detention",
        "chip": "Temporary release",
        "q": "Is there a way to get a family member out of an immigration detention center in Korea after a deportation order?",
        "a": "You can apply for temporary release from protection, and not only the detainee but also a guarantor or legal representative can be the applicant. The office head may grant temporary release on their own authority, and if an application is filed, the Foreigner Protection Committee decides. Submit the application for temporary release, with materials explaining the reasons and the ability to pay the deposit, to the office head or the head of the detention center. The committee decides within 3 weeks of receiving the application, extendable once by up to 2 weeks if unavoidable."
      },
      {
        "id": "release-bond",
        "chip": "Release deposit",
        "q": "How much is the deposit for temporary release from immigration detention in Korea, and can I get it back?",
        "a": "The deposit is set within 20 million won considering the detainee's circumstances, the reasons for the request, and their assets, and conditions such as a residence restriction, regular reporting, and designation of a guarantor are attached. If the released person flees, fails without good reason to comply with a summons, or breaches the conditions, the temporary release is revoked and all or part of the deposit may be forfeited to the state. Unless it is forfeited, the deposit is returned to the person who paid it when the foreign national leaves Korea or the temporary release is revoked. When applying, you must submit materials showing that you can pay the deposit."
      },
      {
        "id": "detention-review-request",
        "chip": "Detention review",
        "q": "If I believe being detained under a protection order in Korea is unjust, where can I challenge it?",
        "a": "The detained person or their legal representative can request a review of the protection from the Foreigner Protection Committee through the head of the regional immigration office. If the request has merit, the committee orders release from protection; if not, it dismisses the request. Attach materials showing that protection is unnecessary, for example that you have a fixed residence and there is no flight risk. This review request is separate from an objection to the deportation order itself, so if you want to challenge the deportation order, you must separately meet the 7-day deadline from receiving the order."
      },
      {
        "id": "detention-period",
        "chip": "Detention during investigation",
        "q": "How many days can I be held in immigration detention in Korea while being investigated for deportation?",
        "a": "Protection for reviewing and deciding whether you are subject to deportation lasts up to 10 days, and if there are unavoidable reasons, it can be extended only once by up to 10 days with the office head's approval. This is a different stage from the protection period for repatriation after a deportation order is issued. At the investigation stage, statements and materials explaining your history of stay, family relationships, and the circumstances of the violation are reflected in the decision, so it helps for family members to gather documents in advance. Protection takes place in an immigration holding room, an immigration detention center, or a place designated by the Minister of Justice."
      },
      {
        "id": "permanent-resident",
        "chip": "Permanent resident exception",
        "q": "Can a foreigner with permanent residency (F-5) in Korea be deported for a crime?",
        "a": "Holders of permanent residency are in principle not deported, but they can be if they fall under an exception set by law. The exceptions are committing crimes of insurrection or treason under the Criminal Act, being released after a sentence of 5 years or more of imprisonment if specified by Ministry of Justice ordinance, and providing vessels or other means for the illegal entry or departure of foreign nationals, or instigating or aiding such acts. Whether you fall under an exception must be checked against the judgment and disposition documents, so prepare copies of the judgment and your permanent residence card. Separately from deportation, there is also a procedure for cancelling permanent residency itself, so identify which kind of notice you received."
      },
      {
        "id": "refugee-application",
        "chip": "Pending refugee claim",
        "q": "If I have applied for refugee status in Korea and then receive a deportation order, will I be sent back immediately?",
        "a": "The law provides that a person must not be repatriated while their refugee application is undecided or while an objection review under the Refugee Act is not yet complete. However, this protection does not apply if the refugee applicant is found to have harmed, or to be likely to harm, the public safety of Korea. Keep documents showing that you applied and what stage the application is at, such as the refugee application receipt. A halt to repatriation is separate from an objection to the deportation order, so if you want to object, you must meet the 7-day deadline from receiving the order."
      },
      {
        "id": "return-country",
        "chip": "Destination country",
        "q": "If I'm deported from Korea, will I only be sent to my country of nationality?",
        "a": "In principle, you are repatriated to the country of your nationality or citizenship. If you cannot be sent there, you may be sent to the country where you lived before coming to Korea, the country of your birthplace, the country of the port where you boarded the ship or aircraft to Korea, or another country to which you wish to be repatriated. If you want to go to another country, prepare documents showing your right to stay in or ability to enter that country and inform the office. The timing of repatriation depends on how enforcement of the order proceeds."
      },
      {
        "id": "self-paid-departure",
        "chip": "Self-paid departure",
        "q": "I'm being investigated as subject to deportation from Korea — if I offer to leave at my own expense, can it be changed to a departure order?",
        "a": "The law provides that even when a person is found subject to deportation, a departure order may be issued to someone who intends to leave voluntarily at their own expense. However, this is a discretionary provision ('may'), so asking does not automatically change it to a departure order; the violation and your circumstances are weighed together. Prepare your passport, a flight reservation, and proof that you can cover the cost of departure to show your intention to leave voluntarily. If you receive a departure order, you must leave by the deadline stated on it, which is set within 30 days of issuance."
      }
    ],
    "terms": [
      {
        "term": "Deportation order (강제퇴거명령서)",
        "def": "A document issued to a suspect by the head of the regional immigration office when a review finds them subject to deportation, stating the purpose of and reasons for the order and that an objection may be filed."
      },
      {
        "term": "Objection to a deportation order (이의신청)",
        "def": "A procedure in which a suspect who disputes a deportation order submits an objection to the Minister of Justice, through the head of the regional immigration office, within 7 days of receiving the order."
      },
      {
        "term": "Protection/detention (보호)",
        "def": "An enforcement measure in which immigration officers take into custody and hold, in an immigration holding room or detention center, a person reasonably suspected of being subject to deportation, in order to remove them from Korea."
      },
      {
        "term": "Temporary release from protection (보호의 일시해제)",
        "def": "A disposition that temporarily releases a person from protection, requiring a deposit of up to 20 million won and attaching conditions such as a residence restriction, considering the detainee's circumstances, the reasons for the request, and their assets."
      },
      {
        "term": "Foreigner Protection Committee (외국인보호위원회)",
        "def": "A committee within the Ministry of Justice that independently reviews objections to protection and re-protection of foreign nationals and approves extensions of protection periods."
      },
      {
        "term": "Special stay permission (체류허가의 특례)",
        "def": "A system allowing the Minister of Justice to permit a stay with conditions, even when an objection is without merit, if the person once held Korean nationality or has special circumstances requiring them to remain."
      },
      {
        "term": "Country of repatriation (송환국)",
        "def": "The country to which a person under a deportation order is sent; in principle the country of nationality or citizenship, and if that is impossible, the country of residence before entry, the country of birth, and so on."
      }
    ],
    "clients": [
      "Overstaying foreign nationals who received a deportation order and are facing the 7-day objection deadline",
      "Korean family members seeking temporary release of a spouse held in an immigration detention center",
      "Long-term foreign residents facing a deportation review after release from a sentence of imprisonment or heavier",
      "Permanent residents (F-5) checking whether they fall under a deportation exception after a criminal judgment",
      "Marriage migrants (F-6) with children in Korea who want to document their family circumstances"
    ]
  },
  "departure-order": {
    "serviceName": "Departure Order Response Service",
    "serviceType": "Review of departure orders and filing of applications to postpone the departure deadline on your behalf",
    "coreAnswer": "If you have received a departure order (출국명령), first check the departure deadline, any conditions such as a residence restriction, and the compliance bond written on the order. The deadline is set within 30 days from the date of issue, and if you do not leave by then or breach a condition, a deportation order (강제퇴거명령) is issued without delay and the bond you deposited may be forfeited to the national treasury. If you are looking for an administrative agent in Korea for a departure order, our office handles the whole response for you: organizing what the order says, preparing and filing the application to postpone the departure deadline, and preparing a new visa application after you leave.",
    "servicesHeading": "What our administrative agent office handles for departure orders",
    "services": [
      {
        "name": "Reviewing and organizing the deadline, conditions and compliance bond on the departure order",
        "href": "#what-to-do-after-order"
      },
      {
        "name": "Preparing and filing an application to postpone the departure deadline",
        "href": "#postpone-illness"
      },
      {
        "name": "Preparing supporting documents for postponement (medical certificate, proof of hospitalization, etc.)",
        "href": "#postpone-illness"
      },
      {
        "name": "Checking how the compliance bond is deposited and refunded",
        "href": "#bond-refund"
      },
      {
        "name": "Drafting a statement of reasons for changing order conditions such as a residence restriction",
        "href": "#residence-restriction"
      },
      {
        "name": "Preparing for a hearing on cancellation of a stay permit and drafting a written opinion",
        "href": "#permit-cancellation-hearing"
      },
      {
        "name": "Preparing documents showing an overstayer's intention to leave voluntarily",
        "href": "#overstay-self-departure"
      },
      {
        "name": "Reviewing whether a disqualification for permanent residence (F-5) applies",
        "href": "#f5-later"
      },
      {
        "name": "Responding to a notice of disposition for an immigration fine",
        "href": "/fines"
      },
      {
        "name": "Preparing and filing an objection to a deportation order",
        "href": "/dispositions/deportation-order"
      },
      {
        "name": "Preparing documents for a new visa application after departure",
        "href": "/dispositions/visa-denial"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "People who fall under deportation grounds but wish to leave voluntarily at their own expense, people who did not comply with a departure recommendation, people whose permits have been cancelled, people whose permanent residence status has been cancelled (except those granted a general status of stay), and people for whom departure measures are found appropriate after an administrative fine or notice of disposition"
      },
      {
        "label": "Requirements",
        "value": "The head of the regional immigration office issues the departure order, sets a departure deadline, may attach conditions such as a residence restriction, and may, if necessary, require a compliance bond of up to 20 million won."
      },
      {
        "label": "Procedure",
        "value": "Receive the departure order → check the deadline, conditions and bond → (if there is an unavoidable reason) apply to postpone the departure deadline → leave by the deadline → bond refunded"
      },
      {
        "label": "Documents",
        "value": "Departure order, passport, flight ticket; when applying for postponement, the application to postpone the departure deadline and documents explaining the reason (medical certificate, proof of hospitalization, evidence of transport problems, etc.)"
      },
      {
        "label": "Timeline",
        "value": "The departure deadline is the date written on the order, within 30 days from the date of issue. If postponement is granted, it is extended until a period separately set by the Minister of Justice when no transport is available, and otherwise until the reason no longer exists."
      }
    ],
    "situations": [
      {
        "id": "what-to-do-after-order",
        "chip": "Right after receiving it",
        "q": "What should I do if I received a departure order in Korea?",
        "a": "Start by checking the departure deadline, any conditions attached, and the amount of the compliance bond and whether it has been paid, then begin preparing to leave within that deadline. If you can leave in time, book your flight and take care of departure steps such as returning your residence card. If illness or transport problems clearly make it impossible to leave in time, apply to postpone the departure deadline before it passes. The application requires the postponement application form and documents explaining the reason. The deadline is set within 30 days from the date of issue, and if you miss it a deportation order is issued without delay."
      },
      {
        "id": "difference-deportation",
        "chip": "Vs. deportation",
        "q": "What is the difference between a departure order and deportation in Korea, and will I be detained or have to pay for my own flight?",
        "a": "A departure order requires you to leave on your own by a set deadline, while deportation is a disposition in which immigration officers carry out the order and send you to your country of repatriation. A person under a deportation order may be held in a protection (detention) facility (보호) if they cannot be sent back immediately because they have no passport or no transport has been arranged, whereas a departure order works by leaving on your own before the deadline. A departure order can be given to someone who falls under deportation grounds but wishes to leave voluntarily at their own expense, while for deportation the head of the office may cover repatriation costs within the budget if necessary. Another difference is that the law lists people who left after a deportation order less than 5 years ago as subject to an entry ban."
      },
      {
        "id": "postpone-illness",
        "chip": "Hospitalized, can't leave",
        "q": "I am in hospital and probably cannot leave Korea by my departure order deadline. What documents do I need to submit?",
        "a": "If illness or another unavoidable reason clearly makes it impossible to leave in time, you can be granted a postponement of the departure deadline. If your hospital stay or treatment will end in time for you to leave, you may not qualify, so check your treatment schedule first. Submit the application to postpone the departure deadline to the competent office together with documents explaining the reason, such as a medical certificate, proof of hospitalization, and a doctor's opinion stating the expected treatment period. If granted, the deadline is extended until the reason no longer exists, so be sure to apply before the original deadline passes."
      },
      {
        "id": "bond-refund",
        "chip": "Compliance bond",
        "q": "How much is the compliance bond for a departure order in Korea and when do I get it back?",
        "a": "The compliance bond is set at up to 20 million won, taking into account the reasons and motives for the departure order, past violations, age, circumstances, assets, risk of flight, and humanitarian grounds. If you miss the departure deadline, all or part of the bond may be forfeited to the national treasury, and if you breach a condition such as a residence restriction, part of it may be forfeited. Unless it is forfeited, it is returned when you leave, so keep the payment receipt together with the departure order. To avoid missing the refund procedure, it is best to confirm with the office how the refund works before your departure date."
      },
      {
        "id": "missed-deadline",
        "chip": "If you miss the deadline",
        "q": "What happens if I miss the deadline on my departure order in Korea?",
        "a": "If you do not leave by the deadline set in the departure order, a deportation order is issued without delay and all or part of the compliance bond may be forfeited to the national treasury. If the deadline has not yet passed and you have an illness or transport problem, apply for postponement of the departure deadline right away. If you have already received a deportation order, first check the objection instructions and deadline written on it. Leaving under a deportation order has a bigger impact than a departure order, because you may be subject to an entry ban until 5 years have passed since departure."
      },
      {
        "id": "residence-restriction",
        "chip": "Residence restriction",
        "q": "My departure order has a residence restriction. Can I move to a new address before I leave Korea?",
        "a": "Breaching a condition such as a residence restriction on the departure order can lead to a deportation order being issued, so do not move on your own. If you really must move, notify the immigration office that issued the order before moving and confirm how to proceed. Having the lease for the new address and a written statement of why you need to move makes it easier to explain. Breaching a condition can also be grounds for forfeiting part of the compliance bond."
      },
      {
        "id": "permit-cancellation-hearing",
        "chip": "Permit cancellation hearing",
        "q": "I received a notice to attend a hearing on cancellation of my stay permit in Korea. Could this lead to a departure order?",
        "a": "If your stay permit is cancelled you may become subject to a departure order, so the hearing is your opportunity to explain your circumstances before that happens. The Minister of Justice must notify you of the reasons for cancellation and the date, time and place of the hearing at least 7 days in advance, so first check the reasons stated in the notice. If the reasons are not true, prepare rebuttal evidence; if they are true, prepare a written opinion and evidence explaining how it happened and your current circumstances, and attend the hearing. If the permit is not cancelled, no departure order follows, so finish your documents before the hearing date."
      },
      {
        "id": "after-fine",
        "chip": "Departure order after a fine",
        "q": "I paid an immigration fine for violating the Immigration Act in Korea. Can I still get a departure order?",
        "a": "Yes. The law lists people for whom departure measures are found appropriate after a notice of disposition (통고처분) as subject to a departure order. Paying the immigration fine (범칙금) as notified means you will not be punished again for the same case, but a departure order is a separate administrative disposition about your stay, not a punishment. If you have reasons to remain in Korea, it is important to submit documents on how you came to stay, your family relationships and employment at the notice-of-disposition stage. You must pay the fine within 15 days of receiving the notice, and if you do not pay, you will be reported to the prosecution."
      },
      {
        "id": "f5-later",
        "chip": "Effect on permanent residence",
        "q": "If I leave Korea under a departure order, can I come back later and apply for permanent residence (F-5)?",
        "a": "The F-5 permanent residence requirements disqualify anyone for whom 5 years have not passed since leaving under a departure order. Once 5 years have passed, this disqualification no longer applies, but you must still meet the other permanent residence requirements and avoid other disqualifications. Keep a copy of the departure order and your entry and exit records so you can prove your departure date. This period is a screening standard for permanent residence and is a separate matter from any period that blocks entry itself."
      },
      {
        "id": "entry-ban-after",
        "chip": "Entry ban?",
        "q": "Will I automatically get an entry ban to Korea if I leave under a departure order?",
        "a": "The entry ban ground the law spells out with a specific period is 'a person for whom 5 years have not passed since leaving after a deportation order', and departure orders are not listed there. However, the Minister of Justice can ban entry on other grounds, such as a risk of harming public safety or social order, and visa screening for many statuses checks your departure order history. When you apply for a visa again, have a copy of the departure order and records showing you left by the deadline ready. The most accurate way to confirm whether an entry ban (입국금지) applies and for how long is through the Korean mission abroad where you apply or the competent immigration office."
      },
      {
        "id": "overstay-self-departure",
        "chip": "Overstay",
        "q": "I was caught overstaying my visa in Korea. Can I get a departure order instead of deportation?",
        "a": "Overstaying falls under deportation grounds, but a departure order can be given to someone who wishes to leave voluntarily at their own expense. Because this is a discretionary decision, a deportation order may still be issued depending on how long you overstayed, the circumstances, and whether there are other violations. Prepare your passport, flight booking, a written explanation of how you came to overstay and documents showing your circumstances, and state your intention to leave voluntarily during the investigation. If a departure order is issued, you must leave within the deadline written on it (within 30 days from the date of issue)."
      },
      {
        "id": "pr-cancelled",
        "chip": "PR status cancelled",
        "q": "If my permanent residence status in Korea is cancelled, will I immediately get a departure order?",
        "a": "People whose permanent residence status has been cancelled are subject to a departure order, but those granted a general status of stay at the time of cancellation are excluded. When cancelling permanent residence status, the Minister of Justice may grant a general status of stay on the person's application if continued stay is found necessary and the requirements for that status are met. That is why, at the hearing stage of the cancellation process, it is important to submit documents on your life in Korea, family and job, and to state that you are applying for a general status of stay. The hearing notice arrives at least 7 days before the hearing date, so prepare your documents within that time."
      }
    ],
    "terms": [
      {
        "term": "Departure order (출국명령)",
        "def": "A disposition by which the head of a regional immigration office orders a person to leave by a set deadline, for example someone who falls under deportation grounds but wishes to leave voluntarily at their own expense, or someone who did not comply with a departure recommendation."
      },
      {
        "term": "Departure order document (출국명령서)",
        "def": "The document issued with a departure order, stating the departure deadline set within 30 days from the date of issue and any conditions such as a residence restriction."
      },
      {
        "term": "Compliance bond (이행보증금)",
        "def": "Money of up to 20 million won deposited to ensure compliance with a departure order; it may be forfeited to the national treasury if the deadline or conditions are breached, and is otherwise returned on departure."
      },
      {
        "term": "Postponement of the departure deadline (출국기한의 유예)",
        "def": "Extending the departure deadline when it is clear the person cannot leave in time because no transport is available or because of illness or another unavoidable reason."
      },
      {
        "term": "Application to postpone the departure deadline (출국기한유예신청서)",
        "def": "The application submitted, with documents explaining the reason, to the head of the competent office or the head of the immigration detention center by a person seeking postponement of the departure deadline."
      },
      {
        "term": "Cancellation or change of permits (각종 허가 등의 취소·변경)",
        "def": "A disposition by which the Minister of Justice cancels or changes a visa issuance, stay permit or similar permit in cases such as false applications, breach of permit conditions or serious violations of law; a person whose permit is cancelled may become subject to a departure order."
      },
      {
        "term": "Notice of disposition (통고처분)",
        "def": "A disposition by which, once an investigation of an immigration offense produces conclusive evidence, the person is notified in writing, with reasons, to pay an immigration fine equivalent to a criminal fine at a designated place."
      }
    ],
    "clients": [
      "Foreign workers who received a departure order after being caught overstaying",
      "Foreign nationals hospitalized during their departure order period who need a postponement of the deadline, and their families",
      "Students (D-2) or employment visa holders who received a notice to attend a stay permit cancellation hearing",
      "People who received a departure order along with paying an immigration fine and want to prepare for returning to Korea later",
      "Permanent residents (F-5) seeking a general status of stay during the cancellation of their permanent residence status"
    ]
  },
  "departure-recommendation": {
    "serviceName": "Departure Recommendation Response Service",
    "serviceType": "Review of departure recommendations and filing of applications to postpone the departure deadline on your behalf",
    "coreAnswer": "A departure recommendation (출국권고) is a disposition recommending that you leave voluntarily when the violation is minor, such as staying beyond your status or period of stay or engaging in activities outside your status without permission, and the departure deadline is set within 5 days from the date the recommendation is issued. If you do not comply, you become subject to a departure order (출국명령), so you need to leave by the deadline or, if there is an unavoidable reason, apply to postpone it before it passes. If you need an administrative agent in Korea for a departure recommendation, our office organizes the reasons and deadline on the recommendation and prepares and files the application to postpone the departure deadline for you.",
    "servicesHeading": "What our administrative agent office handles for departure recommendations",
    "services": [
      {
        "name": "Reviewing and organizing the violation and deadline on the departure recommendation",
        "href": "#read-recommendation"
      },
      {
        "name": "Preparing and filing an application to postpone the departure deadline",
        "href": "#cannot-leave-in-5-days"
      },
      {
        "name": "Preparing documents explaining unavoidable reasons such as a family member's illness",
        "href": "#family-illness-postpone"
      },
      {
        "name": "Drafting a written explanation of how an overstay occurred",
        "href": "#minor-overstay"
      },
      {
        "name": "Drafting an explanation of a part-time work violation by a student (D-2)",
        "href": "#unauthorized-work-student"
      },
      {
        "name": "Drafting a written opinion on the facts behind the departure recommendation",
        "href": "#reason-disputed"
      },
      {
        "name": "Preparing documents for re-entry and visa applications after departure",
        "href": "#visa-after-recommendation"
      },
      {
        "name": "Reviewing departure orders and filing applications to postpone the departure deadline",
        "href": "/dispositions/departure-order"
      },
      {
        "name": "Responding to an immigration offense review for overstay (illegal stay)",
        "href": "/offenses/overstay"
      },
      {
        "name": "Responding to a notice of disposition for an immigration fine",
        "href": "/fines"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "People who stayed beyond the scope of their status or period of stay, or engaged in activities outside their status without permission, where the violation is minor; and other people who violated the law where the Minister of Justice finds a departure recommendation necessary"
      },
      {
        "label": "Requirements",
        "value": "The head of the regional immigration office decides to recommend departure and issues a departure recommendation."
      },
      {
        "label": "Procedure",
        "value": "Receive the departure recommendation → check the violation and deadline → (if there is an unavoidable reason) apply to postpone the departure deadline → leave by the deadline. If you do not comply, you become subject to a departure order"
      },
      {
        "label": "Documents",
        "value": "Departure recommendation, passport, flight ticket, residence card (if it must be returned on departure); when applying for postponement, the application to postpone the departure deadline and documents explaining the reason"
      },
      {
        "label": "Timeline",
        "value": "The departure deadline is the date written on the recommendation, within 5 days from the date of issue. If postponement is granted, it is extended until a period separately set by the Minister of Justice when no transport is available, and otherwise until the reason no longer exists."
      }
    ],
    "situations": [
      {
        "id": "read-recommendation",
        "chip": "Is this deportation?",
        "q": "I received a departure recommendation in Korea. Does this mean I have been deported?",
        "a": "No. A departure recommendation recommends that you leave on your own, and it is a different disposition from a deportation order (강제퇴거명령). The entry ban ground the law spells out with a specific period, 'a person for whom 5 years have not passed since leaving after a deportation order', does not include departure recommendations. However, if you do not comply you become subject to a departure order, and if you also breach that, a deportation order is issued, so it is important to meet the deadline on the recommendation. First check the name of the disposition, the violation, and the departure deadline (within 5 days from the date of issue)."
      },
      {
        "id": "minor-overstay",
        "chip": "Overstayed a few days",
        "q": "I only just realized my period of stay in Korea expired a few days ago. Will I get a departure recommendation?",
        "a": "If the overstay is judged minor you may be subject to a departure recommendation, but the head of the competent office decides which disposition to impose based on the degree and circumstances of the violation. If the violation is not considered minor, another disposition such as a notice of disposition or a departure order may be issued. Prepare your passport, residence card, a written explanation of how the overstay happened and documents showing those circumstances (hospital records, flight cancellation records, etc.), and report to the office voluntarily. Once a disposition is issued, act according to the deadline written on it."
      },
      {
        "id": "unauthorized-work-student",
        "chip": "Student working without permit",
        "q": "Will a student in Korea get a departure recommendation for working a part-time job without part-time work permission?",
        "a": "The guidelines for part-time work by students (D-2) do not use departure recommendations; they divide handling by the number of times caught and the field of work. There is a standard of allowing continued stay after a notice of disposition if it is a first offense and the violation is minor, but illegal work in the construction sector is handled with a departure order without exception, and a second offense with deportation. Prepare a certificate of enrollment and transcripts showing your studies, details of your working period and hours, employer information, and a written explanation. If you receive a notice of disposition, you must pay the immigration fine within 15 days of receiving the notice."
      },
      {
        "id": "cannot-leave-in-5-days",
        "chip": "No flight before deadline",
        "q": "What can I do if I cannot find a flight home before my departure recommendation deadline in Korea?",
        "a": "If it is clear you cannot leave in time because no transport is available, you can apply to postpone the departure deadline. If you could leave in time on another flight or a connecting flight, postponement may not be granted, so check alternatives first. Submit the application to postpone the departure deadline to the competent office with proof that flights could not be booked and your booking for the earliest available flight. When postponement is granted because of transport, it is extended until a period separately set by the Minister of Justice, and you must apply before the original deadline passes."
      },
      {
        "id": "family-illness-postpone",
        "chip": "Family illness or accident",
        "q": "I received a departure recommendation in Korea, but a family member I live with was suddenly hospitalized. Can I delay my departure?",
        "a": "Postponement of the departure deadline is granted when it is clear you cannot leave in time because no transport is available or because of illness or another unavoidable reason, so whether a family member's hospitalization qualifies is decided by the office based on the circumstances. Because it concerns a family member rather than you, you also need to show why you yourself cannot leave, for example that there is no other caregiver. Attach documents proving the family relationship, the family member's medical certificate or proof of hospitalization, and a statement explaining the caregiving situation to the application. If granted, the deadline is extended until the reason no longer exists."
      },
      {
        "id": "after-noncompliance-order",
        "chip": "Departure order after non-compliance",
        "q": "If I miss my departure recommendation deadline and get a departure order instead, how do the deadline and conditions change?",
        "a": "Unlike a departure recommendation, a departure order sets a deadline within 30 days from the date of issue and may come with conditions such as a residence restriction and a compliance bond of up to 20 million won. If you do not leave by the departure order deadline or breach a condition, a deportation order is issued without delay and the bond may be forfeited to the national treasury. When you receive a departure order, organize the deadline, conditions and bond details, and prepare your flight ticket and passport right away. If you are still within the departure recommendation deadline, leaving or applying for postponement within it is less burdensome."
      },
      {
        "id": "which-disposition",
        "chip": "Which disposition?",
        "q": "I was investigated by Korean immigration. Can I know in advance whether I will get a departure recommendation or a departure order?",
        "a": "It is not decided in advance; the head of the office decides based on the nature and degree of the violation. A minor overstay or minor unauthorized activity outside your status may lead to a departure recommendation, while cases such as falling under deportation grounds but wishing to leave voluntarily at your own expense lead to a departure order. Submitting a written explanation and evidence during the investigation showing how and for how long the violation occurred, whether you reported it yourself, and your circumstances in Korea gives the office material for its decision. Once a disposition is issued, plan your next steps based on its name and deadline."
      },
      {
        "id": "reason-disputed",
        "chip": "Reason is wrong",
        "q": "What should I do if the violation stated on my departure recommendation in Korea is not true?",
        "a": "The law does not set out a separate objection procedure for departure recommendations, so the first step is to submit a written opinion and evidence setting out the facts to the competent office before the deadline and confirm how it will be handled. If the document you received explains how and by when to challenge it, follow those instructions. Prepare materials showing the stated reason is wrong, such as your stay permit, employment contract and entry and exit records. The departure deadline is short, within 5 days from the date of issue, so do not lose track of it while submitting your opinion."
      },
      {
        "id": "employer-check",
        "chip": "For employers",
        "q": "What does a company in Korea need to do when a foreign employee receives a departure recommendation and leaves the job?",
        "a": "Anyone employing a foreign national with a status that permits employment must report to the competent immigration office within 15 days when the employee leaves the job or a similar change occurs. It is best to align the employee's last working day and final pay settlement so they can leave within the departure recommendation deadline. The report requires details of the employment change and business information, so keep the employment contract and records of the resignation date in order. If the employee's violation relates to employment without permission, the company may also be investigated separately, so check the reason for the disposition."
      },
      {
        "id": "arc-return",
        "chip": "Returning residence card",
        "q": "What do I do with my residence card when I leave Korea after a departure recommendation?",
        "a": "As a rule, registered foreign nationals return their residence card to an immigration officer when they leave. Exceptions apply to those who have a re-entry permit, hold a multiple-entry visa or are exempt from re-entry permits and plan to return within the permitted period, but if you are leaving under a departure recommendation, confirm at the airport whether you must return it. Bring your passport, residence card and departure recommendation when you leave. You must leave within the deadline written on the recommendation (within 5 days from the date of issue)."
      },
      {
        "id": "visa-after-recommendation",
        "chip": "Visa after leaving",
        "q": "If I leave Korea by the deadline on my departure recommendation, can I apply for a Korean visa again?",
        "a": "You can apply, and visa screening checks the common screening standards, including whether any entry restriction applies, together with the standards for the specific status. The 5-year rule after deportation listed in the law as an entry ban ground does not apply to departure recommendations, but you need to check separately whether the Minister of Justice has banned your entry on other grounds. When reapplying, prepare a copy of the departure recommendation, records showing you left by the deadline, and documents showing the purpose of your new visit. The law does not set a general waiting period before you can reapply."
      }
    ],
    "terms": [
      {
        "term": "Departure recommendation (출국권고)",
        "def": "A disposition by which the head of a regional immigration office recommends that a foreign national whose violation is minor leave Korea voluntarily."
      },
      {
        "term": "Departure recommendation document (출국권고서)",
        "def": "The document issued with a departure recommendation, which may set a departure deadline within 5 days from the date of issue."
      },
      {
        "term": "Activities outside one's status of stay (체류자격 외 활동)",
        "def": "Engaging in activities belonging to another status of stay in addition to those of one's own status, which requires prior permission from the Minister of Justice."
      },
      {
        "term": "Postponement of the departure deadline (출국기한의 유예)",
        "def": "Extending the departure deadline when it is clear the person cannot leave in time because no transport is available or because of illness or another unavoidable reason."
      },
      {
        "term": "Departure order (출국명령)",
        "def": "A disposition ordering a person, such as someone who did not comply with a departure recommendation, to leave with a set deadline and conditions."
      },
      {
        "term": "Returning the residence card (외국인등록증 반납)",
        "def": "Handing the residence card back to an immigration officer when a registered foreign national leaves Korea, with exceptions such as holding a re-entry permit."
      }
    ],
    "clients": [
      "Short-term foreign visitors who received a departure recommendation after overstaying by a few days",
      "Students (D-2) caught working without part-time work permission",
      "Foreign nationals who could not find a flight before their departure recommendation deadline and need a postponement",
      "Employers handling the resignation report for a foreign employee who received a departure recommendation",
      "People who left after a departure recommendation and want to apply for a visa again"
    ]
  },
  "entry-ban": {
    "serviceName": "Entry Ban (Entry Restriction) Lifting Request Document Service",
    "serviceType": "Preparation of entry restriction lifting requests and new visa applications",
    "coreAnswer": "An entry ban (입국금지) is a measure by which the Minister of Justice blocks the entry of foreign nationals who fall under grounds set by law, such as a risk related to infectious disease or public safety, or leaving after a deportation order less than 5 years ago, and the law sets no deadline or fixed form for an 'application to lift' it. The key is therefore to show in documents that the grounds for the ban no longer exist or that your circumstances have changed. If you are looking for an administrative agent in Korea for lifting an entry ban, our office prepares the request documents to lift the entry restriction and the visa application documents for the Korean mission abroad on your behalf.",
    "servicesHeading": "What our administrative agent office handles for entry restriction lifting requests",
    "services": [
      {
        "name": "Preparing request documents to lift an entry restriction (statement of reasons, supporting documents)",
        "href": "#how-to-request-lifting"
      },
      {
        "name": "Organizing evidence that the grounds have ended or circumstances have changed",
        "href": "#cause-resolved"
      },
      {
        "name": "Identifying the route to request lifting of a ban imposed at another agency's request",
        "href": "#requested-by-other-agency"
      },
      {
        "name": "Drafting a statement of humanitarian reasons (family funeral, hospital visit)",
        "href": "#humanitarian-visit"
      },
      {
        "name": "Preparing visa application documents for the Korean mission abroad",
        "href": "#apply-visa-abroad"
      },
      {
        "name": "Preparing visa documents for inviting a spouse on a marriage migrant (F-6) visa",
        "href": "#invitation-by-spouse"
      },
      {
        "name": "Applying for a re-entry permit for people under entry restriction",
        "href": "#reentry-permit"
      },
      {
        "name": "Preparing a visa application after being refused entry at the airport",
        "href": "#denied-at-airport"
      },
      {
        "name": "Preparing and filing an objection to a deportation order",
        "href": "/dispositions/deportation-order"
      },
      {
        "name": "Checking reasons for a visa denial and preparing a new application",
        "href": "/dispositions/visa-denial"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreign nationals who fall under grounds set by law, such as people posing a public health risk (e.g. patients with infectious diseases or people addicted to narcotics), people at risk of harming Korea's interests, public safety, or economic or social order, and people for whom 5 years have not passed since leaving after a deportation order"
      },
      {
        "label": "Requirements",
        "value": "A decision by the Minister of Justice to ban entry (including bans requested by central government agencies and others). A person subject to an entry ban does not meet the requirements of visa screening or entry inspection."
      },
      {
        "label": "Procedure",
        "value": "Confirm whether an entry ban applies (visa application result, denial notice) → prepare evidence that the grounds have ended or circumstances have changed → confirm where and how to submit with the competent immigration office or the Korean mission abroad → apply for a visa once lifting is confirmed"
      },
      {
        "label": "Documents",
        "value": "Copy of passport, statement of reasons requesting the lifting, documents showing the grounds for the ban no longer exist, evidence of changed circumstances such as family relationships in Korea, and any visa denial notice or notice of refusal of entry you received"
      },
      {
        "label": "Timeline",
        "value": "The law sets no processing period for lifting, so it depends on the competent authority. The entry ban ground with a period written in the law is leaving after a deportation order less than 5 years ago."
      }
    ],
    "situations": [
      {
        "id": "how-to-request-lifting",
        "chip": "How to request lifting",
        "q": "How to lift an entry ban to Korea — how do I apply?",
        "a": "The Immigration Act does not set a deadline or form for an 'application to lift' an entry ban; the Minister of Justice decides on and lifts entry bans. If the ban was imposed at another government agency's request, that agency must ask the Minister of Justice to lift it once the grounds no longer exist, so the starting point is to submit evidence to that agency that the grounds are gone; if the Ministry of Justice decided the grounds itself, confirm where to submit with the competent immigration office or the Korean mission abroad where you will apply for a visa. Prepare a statement of reasons requesting the lifting, documents showing the grounds no longer exist, and evidence of changed circumstances such as family relationships. The law sets no processing period, so if your timing is urgent, say so in your statement."
      },
      {
        "id": "ban-period-unknown",
        "chip": "Checking ban length",
        "q": "Where can I find out how many years my entry ban to Korea lasts?",
        "a": "The only entry ban ground with a period written directly in the law is 'a person for whom 5 years have not passed since leaving after a deportation order'; other grounds have no uniform period in the law. So rather than trusting the 'X years per violation' tables circulating online, you need to confirm the decision made about you. If you are abroad, ask the Korean mission where you will apply for a visa; if you are in Korea, ask the competent immigration office, bringing your passport details and past disposition documents. If your visa was denied, you can visit the mission and request a notice stating the reasons for denial."
      },
      {
        "id": "five-years-after-deportation",
        "chip": "5 years after deportation",
        "q": "Can I automatically enter Korea again once 5 years have passed since I was deported?",
        "a": "After 5 years you no longer fall under the ground 'within 5 years of leaving after a deportation order', but that alone does not assure entry. The Minister of Justice can also ban entry on other grounds, such as a risk of harming public safety or social order, and visa screening separately looks at the purpose of entry and the standards for each status. When applying for a visa, prepare entry and exit records showing your departure date at the time of deportation and documents about your life and work since then. The 5 years are counted from the date of departure, so confirm that date first."
      },
      {
        "id": "denied-at-airport",
        "chip": "Refused at airport",
        "q": "I was refused entry at a Korean airport when trying to enter without a visa. Is it because of an entry ban?",
        "a": "Entry inspection checks the validity of your passport and visa, whether your purpose of entry matches your status, and whether you are subject to an entry ban or refusal, so it may be due to an entry ban or because you could not prove your purpose of entry. When entry is not permitted you are given a notice of refusal of entry, so start by checking what it says. Before your next trip, prepare the notice and documents showing your purpose of entry such as your itinerary, accommodation and return ticket, and if you suspect an entry ban, consider confirming it by applying for a visa at a Korean mission abroad. The law does not set when you may try again."
      },
      {
        "id": "cause-resolved",
        "chip": "Proof grounds have ended",
        "q": "What documents show that the grounds for my entry ban to Korea no longer exist?",
        "a": "What you need depends on the ground for the ban. For public health grounds such as an infectious disease, medical documents confirming treatment has been completed; if the issue was the ability to cover living costs in Korea, proof of financial capacity; and for a ban requested by another agency, that agency's confirmation that the grounds have been resolved are the key documents. Submit these together with a statement of reasons requesting the lifting, a copy of your passport and past disposition documents. The law sets no processing period, so it is best to prepare everything completely in one go."
      },
      {
        "id": "requested-by-other-agency",
        "chip": "Ban requested by another agency",
        "q": "My entry to Korea was banned at the request of a government agency other than the Ministry of Justice. Where do I start to get it lifted?",
        "a": "When entry is banned at the request of a central government agency or similar body, the requesting agency must ask the Minister of Justice to lift it without delay once the grounds no longer exist. So first confirm which agency made the request, then submit evidence to that agency that the grounds have been resolved. Prepare that agency's disposition documents, documents proving the grounds have been resolved, and a statement of reasons for your request. The law sets no processing period for the Ministry of Justice after the lifting request."
      },
      {
        "id": "humanitarian-visit",
        "chip": "Family funeral or illness",
        "q": "I am under an entry ban, but my parent in Korea is critically ill. Is there any way I can enter?",
        "a": "The law has no separate entry exception for funerals or hospital visits, so the basic route is to explain your changed circumstances and have a decision made on lifting the entry ban or issuing a visa. An entry ban is a disposition the Minister of Justice 'may' impose, so an urgent family situation can be taken into account, but the outcome cannot be promised. Prepare documents proving the family relationship, a medical certificate or documents relating to the death, and a statement of reasons with your planned length of stay and return plan, and contact the Korean mission where you will apply for a visa in advance. It is best to state clearly at the very start of your statement that the matter is urgent."
      },
      {
        "id": "apply-visa-abroad",
        "chip": "Visa after lifting",
        "q": "Where and how do I apply for a Korean visa after my entry ban is lifted?",
        "a": "As a rule, you apply for a visa at the Korean mission in your country of residence, and if you have an inviter, they can apply in Korea for a Certificate for Confirmation of Visa Issuance (사증발급인정서) on your behalf. If you are designated as a person subject to visa issuance restriction, requiring special approval by the Minister of Justice, the mission needs the Minister's approval before issuing the visa, which adds a screening step. In addition to the visa application form, passport and documents for the status, prepare your past disposition documents and confirmation of the lifting. Screening time varies with the status and the mission."
      },
      {
        "id": "invitation-by-spouse",
        "chip": "Inviting a spouse",
        "q": "Can a Korean citizen invite a foreign spouse who is banned from entering Korea on a marriage visa?",
        "a": "You can apply to invite them, but visa screening checks that the invitee is not subject to an entry ban or refusal, so a visa is hard to obtain while the ban remains. That is why the request to lift the entry restriction should come first or be prepared in parallel. The marriage migrant (F-6) visa is also separately screened for the genuineness of the marriage, the inviter's income requirement and housing, so prepare marriage documents, evidence of how your relationship developed, and income and housing documents. If a visa for marital cohabitation is not granted, you may reapply after 6 months from that date, or earlier if there are urgent circumstances such as childbirth."
      },
      {
        "id": "reentry-permit",
        "chip": "Re-entry while staying",
        "q": "What does a person under entry restriction who is currently staying in Korea need in order to leave briefly and come back?",
        "a": "Guidance for many statuses of stay requires people under entry restriction and people subject to visa issuance restriction to visit the immigration office (office or branch) with jurisdiction over their place of stay in person to obtain a re-entry permit. Even when other residents are exempt from re-entry permits, people under entry restriction may be excluded from the exemption, so be sure to check before leaving. In addition, when the head of an office grants stay-related permits to people under an entry ban or visa issuance restriction, approval from the Minister of Justice is required, so processing may take longer. Prepare your passport, residence card, re-entry permit application and documents on the reason for leaving, and apply well ahead of your departure date."
      },
      {
        "id": "fine-history",
        "chip": "Left after a fine",
        "q": "I received a criminal fine in Korea and then left. I am worried I may now be banned from entering Korea",
        "a": "A criminal fine itself is not written into the law as an entry ban ground, but the Minister of Justice can ban entry for reasons such as a risk of harming public safety or social order, so you need to confirm the decision made about you. For example, the working holiday (H-1) visa has a standard of issuing visas even to people who violated Korean law during a past stay as long as no entry restriction applies, so whether an entry restriction exists is the key point to check. Prepare the court judgment or summary order, the fine payment receipt and your departure record, and check with the Korean mission where you will apply for a visa. If a restriction is confirmed, prepare request documents to lift it."
      },
      {
        "id": "overstay-departure",
        "chip": "Left after overstaying",
        "q": "I overstayed in Korea and then left on my own. Can I enter Korea again?",
        "a": "The entry ban ground with a period written in the law is leaving after a deportation order, so your situation depends on which disposition you left under. If you left after a departure order or departure recommendation, that document and records showing you left by the deadline are important, and the visa standards for many statuses treat a history of departure orders or deportation as a screening factor. Prepare a copy of the disposition document, the immigration fine payment receipt (if any) and your entry and exit records, and check with the Korean mission where you will apply for a visa whether an entry restriction applies. If one does, you will need request documents for lifting it that show the grounds have ended and circumstances have changed."
      }
    ],
    "terms": [
      {
        "term": "Entry ban (입국금지)",
        "def": "The Minister of Justice prohibiting the entry of foreign nationals who fall under grounds set by law, such as patients with infectious diseases, people at risk of harming public safety, and people for whom 5 years have not passed since leaving after a deportation order."
      },
      {
        "term": "Entry refusal (입국거부)",
        "def": "Refusing entry to nationals of a country, on the same grounds, when that country refuses entry to Korean nationals on grounds other than the entry ban grounds set by law."
      },
      {
        "term": "Entry restriction (입국규제)",
        "def": "The practical term for a state in which a foreign national's entry is restricted, for example by an entry ban; it is an item checked in the common screening for visa issuance."
      },
      {
        "term": "Person subject to visa issuance restriction (사증발급규제자)",
        "def": "A person designated by the Minister of Justice as able to receive a visa only with special approval; a Korean mission abroad must obtain the Minister's approval before issuing a visa to such a person."
      },
      {
        "term": "Notice of refusal of entry (입국 불허가 통지서)",
        "def": "The document an immigration officer gives to a foreign national when entry is not permitted at entry inspection."
      },
      {
        "term": "Re-entry permit (재입국허가)",
        "def": "A permit obtained in advance by a registered foreign national or similar person who leaves during their period of stay and intends to return; people under entry restriction must obtain it by visiting the competent office."
      },
      {
        "term": "Certificate for Confirmation of Visa Issuance (사증발급인정서)",
        "def": "A document the Minister of Justice issues, on the application of a foreign national seeking entry, when deemed necessary before a visa is issued; the person extending the invitation may apply on their behalf."
      }
    ],
    "clients": [
      "Foreign nationals who left after deportation and want to apply for a visa again, and their families in Korea",
      "Korean citizens wishing to invite a foreign spouse under an entry ban as a marriage migrant (F-6)",
      "Foreign nationals refused entry at the airport who want to find out why and prepare a visa application",
      "People banned from entry at the request of another government agency who are looking for the route to request lifting",
      "People under entry restriction who are staying in Korea and need a re-entry permit"
    ]
  },
  "visa-denial": {
    "serviceName": "Visa Denial Response Service",
    "serviceType": "Analysis of visa denial reasons and preparation of new visa application documents on your behalf",
    "coreAnswer": "When a visa is denied, the denial and its reasons may be notified online, and if you visit the Korean mission where you applied and ask, you can receive a visa denial notice right away, so checking those reasons is the starting point for reapplying. If you need an administrative agent in Korea for a visa denial, our office prepares your new visa application for you, including analyzing the denial reasons, preparing a new application for a Certificate for Confirmation of Visa Issuance (사증발급인정서), and preparing the inviter's supporting documents. Court proceedings challenging a denial are outside the scope of our office's services.",
    "servicesHeading": "What our administrative agent office handles for visa reapplication documents",
    "services": [
      {
        "name": "Checking and analyzing the reasons for a visa denial",
        "href": "#refusal-reason"
      },
      {
        "name": "Preparing a new application for a Certificate for Confirmation of Visa Issuance (filed by the inviter)",
        "href": "#reapply-via-invitation"
      },
      {
        "name": "Strengthening documents for a marriage migrant (F-6) visa reapplication",
        "href": "#f6-refused"
      },
      {
        "name": "Reviewing whether the inviter falls under any disqualification",
        "href": "#inviter-record"
      },
      {
        "name": "Preparing documents explaining the purpose of entry and planned return",
        "href": "#purpose-not-shown"
      },
      {
        "name": "Supplementing documents to meet the visa standards for each status",
        "href": "#documents-missing"
      },
      {
        "name": "Drafting an explanation of past violations during a stay in Korea",
        "href": "#past-violation"
      },
      {
        "name": "Reviewing the requirements for a non-professional employment (E-9) Certificate for Confirmation of Visa Issuance",
        "href": "#e9-five-years"
      },
      {
        "name": "Preparing request documents to lift an entry restriction",
        "href": "/dispositions/entry-ban"
      },
      {
        "name": "Reviewing how a criminal record affects your stay",
        "href": "/visa-impact"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreign nationals who applied for a visa at a Korean mission abroad, or whose inviter applied for a Certificate for Confirmation of Visa Issuance, and did not receive it, as well as their inviters"
      },
      {
        "label": "Requirements",
        "value": "Visa screening checks for a valid passport, whether you are subject to an entry ban or refusal, whether you qualify for the status, whether you can explain a purpose of entry that fits the status, whether you will return home within the permitted period of stay, and the standards set separately for each status."
      },
      {
        "label": "Procedure",
        "value": "Confirm the denial and its reasons (online notice, or a visa denial notice when visiting the Korean mission) → analyze the reasons → supplement documents → reapply for a visa at the mission or for a Certificate for Confirmation of Visa Issuance"
      },
      {
        "label": "Documents",
        "value": "Visa denial notice (or the contents of the denial notification), passport, visa application form, documents addressing the denial reasons (proof of purpose of entry, finances, relationships, etc.), and the inviter's documents for an invitation-based visa"
      },
      {
        "label": "Timeline",
        "value": "The law has no general rule on how long to wait before reapplying, and it depends on the competent authority. For a visa for marital cohabitation, you may reapply after 6 months from the date it was not granted (except in urgent circumstances such as childbirth)."
      }
    ],
    "situations": [
      {
        "id": "refusal-reason",
        "chip": "Finding the reason",
        "q": "How can I find out why my Korean visa was denied if the embassy did not tell me the reason?",
        "a": "The Korean mission may notify you of the denial and its reasons online, and if you visit the mission where you applied in person and ask, it must give you a visa denial notice without delay. If the online notice does not state the reasons clearly enough, requesting the notice in person is the reliable way. Bring your passport and application receipt when you visit. The reasons on the notice determine what you need to strengthen in your new application."
      },
      {
        "id": "reapply-via-invitation",
        "chip": "Re-inviting via certificate",
        "q": "After my visa was denied, can a Korean company invite me again with a Certificate for Confirmation of Visa Issuance?",
        "a": "The person extending the invitation can apply for a Certificate for Confirmation of Visa Issuance on the foreign national's behalf, so a Korean company inviting you again is an option. However, the certificate is subject to the same issuance standards as a visa, so if the previous denial reasons have not been resolved, the outcome is unlikely to change. Prepare documents addressing the previous denial reasons together with the employment contract, business documents and the documents required for the status. If the certificate is not issued, a notice stating the denial and its reasons may be sent online."
      },
      {
        "id": "f6-refused",
        "chip": "Marriage visa fixes",
        "q": "My marriage migrant (F-6) visa was not granted because the genuineness of the marriage was questioned. What should I strengthen before reapplying?",
        "a": "A visa for marital cohabitation is screened on how the relationship developed and the intention to marry, whether the marriage was validly formed under the law of the relevant country, the inviter's income requirement, at least basic Korean language ability, and housing where the couple can live together, so you need to identify the items that were not accepted and address them. If genuineness was the issue, add photos, message history and visit records showing how your relationship developed, as well as evidence of contact between both families. Recheck the inviter's income and housing documents and the invitee's Korean language documents too. You may reapply after 6 months from the date the visa was not granted, or earlier if there are urgent circumstances such as childbirth."
      },
      {
        "id": "inviter-record",
        "chip": "Inviter's violations",
        "q": "If the CEO of the company inviting a foreign worker has a record of violating the Immigration Act, will the visa be denied?",
        "a": "If the inviter was punished or paid an immigration fine for violating the Immigration Act, such as false invitations or illegal employment, or for violating certain other laws, and the set period has not yet passed, the Certificate for Confirmation of Visa Issuance may not be issued. If there is no such violation or the period has passed, this ground does not apply and the question is whether the other requirements are met. Check the inviter's disposition history (court judgments, notice of disposition documents) and the payment and finalization dates to see whether it applies. Compliance with recent reporting obligations for employing foreign nationals may also be screened, so organize the report history as well."
      },
      {
        "id": "purpose-not-shown",
        "chip": "Explaining purpose",
        "q": "I think my Korean visa was denied because I did not explain the purpose of my visit well. What should I prepare?",
        "a": "Visa screening checks whether you explain a purpose of entry that fits the status and whether it is accepted that you will return home within the permitted period of stay, so you need to show both in documents. If your purpose did not fit the status, consider applying under a status that does; if the purpose fit but the evidence was weak, strengthen the documents. Prepare an invitation letter, itinerary, proof of employment or enrollment in your home country, asset and income documents, and a return flight booking. The law has no general rule on waiting before reapplying, but reapplying without improvements is likely to produce the same result."
      },
      {
        "id": "documents-missing",
        "chip": "Missing documents",
        "q": "How do I find out which documents were missing from my Korean visa application and fix them?",
        "a": "Visa screening checks, in addition to the common legal standards, the standards the Minister of Justice sets separately for each status, so you need to compare the standards and required documents for the status you applied for item by item. If the denial notice says documents were incomplete, provide those documents; if the reason is worded generally, recheck all the standards for that status. Lay the denial notice, copies of the documents you submitted, and the list of required documents for the status side by side and compare them. Documents needing translation or notarization take time, so build that into your reapplication schedule."
      },
      {
        "id": "past-violation",
        "chip": "Past overstay",
        "q": "Was my Korean visa denied because I overstayed in Korea in the past?",
        "a": "It may have been. Visa screening checks entry restrictions across the board, and the standards for many statuses treat departure orders, deportation or violations of Korean law as screening factors. If an entry restriction applies, requesting its lifting comes before improving your visa documents; if not, respond with a written explanation of the past violation and evidence of how you have lived responsibly since. Prepare past disposition documents, immigration fine payment receipts, departure records, and employment and family documents from your home country. It is best to first confirm which applies from the reasons on the visa denial notice."
      },
      {
        "id": "criminal-record-home",
        "chip": "Home-country record",
        "q": "Will my Korean visa be denied if my home country criminal record certificate shows a fine?",
        "a": "It cannot be answered in general because each status has different standards, so you need to check the standards for the status you are applying for. For example, the working holiday (H-1) visa has a standard of not issuing the visa if the criminal record certificate from the country of residence shows a finalized sentence of a fine of 3 million won or more, and the visa for marital cohabitation checks whether the couple have shared their criminal record information with each other. Prepare the original criminal record certificate and a translation, along with documents showing the judgment and that the sentence has been completed. If you were denied, first check whether the reason on the denial notice is your criminal record."
      },
      {
        "id": "entry-ban-cause",
        "chip": "Denied due to entry ban",
        "q": "If my Korean visa denial says I am subject to an entry ban, is there any point in applying again?",
        "a": "Visa screening requires that you are not subject to an entry ban or refusal, so reapplying with the same documents while the ban remains is unlikely to change the outcome. If the grounds for the ban have ended or your circumstances have changed, the right order is to prepare a request to lift the entry restriction first and reapply for a visa once the lifting is confirmed. Gather the visa denial notice, past disposition documents related to the ban and evidence that the grounds have ended. The law sets no processing period for lifting, so allow plenty of time in your travel plans."
      },
      {
        "id": "e9-five-years",
        "chip": "E-9 re-entry rule",
        "q": "I worked in Korea for a long time on a non-professional employment (E-9) visa. Why is a new E-9 Certificate for Confirmation of Visa Issuance not being issued?",
        "a": "There is a rule that an E-9 Certificate for Confirmation of Visa Issuance is not issued to anyone who has stayed in Korea for 5 years or more under the non-professional employment (E-9) status, and the same applies when the combined period with seafarer employment (E-10) is 5 years or more. However, any extension of the employment period under the Act on the Employment of Foreign Workers is not counted. Calculate your actual period of stay using your past alien registration records, entry and exit records, and documents showing any extension of your employment period. If you fall under this rule, it is more realistic to look at the requirements for another status than to reapply for E-9."
      },
      {
        "id": "visa-issuance-restriction",
        "chip": "Visa issuance restriction",
        "q": "I was told I am a person subject to visa issuance restriction who needs Ministry of Justice approval. What does that mean?",
        "a": "A person subject to visa issuance restriction is someone the Minister of Justice has designated as able to receive a visa only with special approval, and a Korean mission abroad must obtain the Minister's approval before issuing a visa to such a person. If you are not designated, screening proceeds at the mission level; if you are, the approval procedure is added and there are more screening steps. When applying, submit your past disposition documents and evidence that the grounds for the restriction have been resolved from the start. The law sets no processing period for the approval procedure, so it varies from case to case."
      },
      {
        "id": "disclose-refusal",
        "chip": "Disclosing past denial",
        "q": "When I apply for a Korean visa again, can I leave out my previous denial or past violations?",
        "a": "You must not misstate or hide them. Applying for a visa or a Certificate for Confirmation of Visa Issuance with false information is prohibited by law, and a permit obtained by false or fraudulent means can be cancelled if this later comes to light. The right approach is to state your previous denial and past violations as they are and submit a written explanation and evidence showing how those issues have been resolved. Have the denial notice and past disposition documents ready in advance and make sure they match what you write on the application."
      }
    ],
    "terms": [
      {
        "term": "Visa (사증)",
        "def": "A document issued by the Minister of Justice that a foreign national must hold together with a valid passport when entering Korea; it is divided into single-entry visas, allowing one entry, and multiple-entry visas, allowing two or more."
      },
      {
        "term": "Certificate for Confirmation of Visa Issuance (사증발급인정서)",
        "def": "A document the Minister of Justice issues, on the application of a foreign national seeking entry, when deemed particularly necessary before a visa is issued; the person extending the invitation may apply on their behalf."
      },
      {
        "term": "Visa denial notice (사증발급거부통지서)",
        "def": "A document stating the denial and its reasons, which the head of a Korean mission abroad must give without delay when an applicant whose visa was denied visits the mission where they applied and requests it."
      },
      {
        "term": "Visa issuance standards (사증 등 발급의 기준)",
        "def": "The common standards requiring screening of a valid passport, whether the person is subject to an entry ban or refusal, whether they qualify for the status, explanation of the purpose of entry, whether they will return within the period of stay, and the standards for each status."
      },
      {
        "term": "Visa issuance standards for marital cohabitation (결혼동거 목적의 사증 발급 기준)",
        "def": "The standards for screening marriage migrant visas, checking how the relationship developed, formation of the marriage, the inviter's income, Korean language ability, housing and more; if the visa is not granted, you may reapply after 6 months."
      },
      {
        "term": "Person subject to visa issuance restriction (사증발급규제자)",
        "def": "A person designated by the Minister of Justice as able to receive a visa only with special approval regarding visa issuance."
      },
      {
        "term": "Korean mission abroad (재외공관)",
        "def": "Korean embassies, consulates and similar offices abroad, which handle visa issuance under delegation from the Minister of Justice."
      }
    ],
    "clients": [
      "International couples preparing to reapply after a marriage migrant (F-6) visa was not granted",
      "Korean companies whose Certificate for Confirmation of Visa Issuance for overseas workers was denied and who want to find out why",
      "Foreign nationals with past violations during a stay in Korea who are worried about visa screening",
      "Applicants who received a denial notice from a Korean mission abroad and want to prepare supplementary documents",
      "People whose home country criminal record certificate shows a record and who want to check the eligibility standards"
    ]
  },
  "visa-impact": {
    "serviceName": "Service for the Impact of Criminal Dispositions and Violation Records on Stay Permits",
    "serviceType": "Explaining criminal disposition records on your behalf when applying for extension of period of stay, change of status of stay, or permanent residence (F-5)",
    "coreAnswer": "Will a criminal fine cancel my visa? A fine alone does not immediately cancel your stay permit, but a serious violation can be grounds for cancelling or changing the permit, and screening for extension of period of stay (체류기간 연장허가), change of status of stay (체류자격 변경허가) and permanent residence (F-5) checks your criminal record and payment records of immigration fines (범칙금) and administrative fines (과태료), applying different standards for each status, while naturalization separately looks at a good conduct requirement. For example, for a change to permanent residence (F-5), the good conduct requirement is treated as not met until 3 years have passed from the date the fine was paid. If you need an administrative agent in Korea for a visa affected by a criminal record, our office prepares extension and change applications and supporting explanations that address your disposition record.",
    "servicesHeading": "What our administrative agent office handles for stay permits after a criminal disposition",
    "services": [
      {
        "name": "Applying for extension of period of stay (including explaining a criminal disposition record)",
        "href": "#extension-under-investigation"
      },
      {
        "name": "Applying for a change of status of stay to permanent residence (F-5)",
        "href": "#f5-after-fine"
      },
      {
        "name": "Drafting a written opinion for a hearing on cancellation of permanent residence status",
        "href": "#f5-revocation"
      },
      {
        "name": "Applying for extension of period of stay for residence (F-2) (checking whether law-abiding citizenship education applies)",
        "href": "#f2-civic-education"
      },
      {
        "name": "Applying for a change of status of stay to spouse of a Korean national (F-6-1)",
        "href": "#f6-change"
      },
      {
        "name": "Applying for a change of status of stay to overseas Korean (F-4)",
        "href": "#f4-total-fines"
      },
      {
        "name": "Preparing an application for a change of status of stay to skilled worker (E-7-4)",
        "href": "#e74-points"
      },
      {
        "name": "Applying for a change of status of stay to job seeker (D-10)",
        "href": "#d10-change"
      },
      {
        "name": "Drafting a written explanation for a hearing on cancellation or change of a stay permit",
        "href": "#cancellation-hearing"
      },
      {
        "name": "Checking the departure deadline and preparing follow-up documents after an extension is denied",
        "href": "#extension-denied"
      },
      {
        "name": "Organizing documents on the conduct requirement before applying for naturalization",
        "href": "#naturalization"
      },
      {
        "name": "Preparing documents for an immigration offense review (written opinion, letter of apology, petition)",
        "href": "/immigration-offense-review"
      }
    ],
    "glance": [
      {
        "label": "Who it applies to",
        "value": "Foreign nationals who, after a criminal disposition such as a fine, suspended sentence or prison sentence, or an immigration fine or administrative fine, wish to apply for extension of period of stay, change of status of stay, permanent residence (F-5) or naturalization"
      },
      {
        "label": "Requirements",
        "value": "Stay permit screening may check criminal record and investigation record information as well as payment records of immigration fines and administrative fines, and the effect of a disposition depends on the standards for the status you are applying for."
      },
      {
        "label": "Procedure",
        "value": "Check your disposition records → compare them with the disqualification and point-deduction standards for the status → submit the application and supporting documents → screening → approval or denial (notice of departure deadline)"
      },
      {
        "label": "Documents",
        "value": "Application and basic documents for the status, court judgment, summary order or non-indictment documents, receipts for payment of fines or immigration fines, a written statement of remorse and measures to prevent recurrence, and documents on your life in Korea such as family relationships, employment and tax payments"
      },
      {
        "label": "Timeline",
        "value": "An extension of period of stay must be applied for before your period of stay ends, and screening time depends on the competent immigration office. If it is not granted, a departure deadline may be set within 14 days from the date the notice is issued."
      }
    ],
    "situations": [
      {
        "id": "fine-visa-cancel",
        "chip": "Fine and visa cancellation",
        "q": "If I receive a criminal fine in Korea, will my current visa be cancelled right away, or will it only matter at my next extension?",
        "a": "A fine alone does not immediately cancel your stay permit, and the record is mainly checked at your next extension or change screening. However, if the violation of the Immigration Act or another law is serious, it can be grounds for cancelling or changing your stay permit even during your remaining period of stay, and if a hearing is held you will be notified of the reasons and the date, time and place at least 7 days before. When applying for extension, prepare the court judgment or summary order, the fine payment receipt and a written statement of remorse and measures to prevent recurrence. You must apply for extension before your period of stay ends."
      },
      {
        "id": "f5-after-fine",
        "chip": "F-5 after a fine",
        "q": "How long do I have to wait to apply for permanent residence (F-5) in Korea after receiving a criminal fine?",
        "a": "Under the good conduct requirement for changing to permanent residence (F-5), a person for whom 3 years have not passed since paying a fine imposed as a criminal sentence is disqualified (some sub-categories have separate standards). For a suspended sentence of imprisonment or heavier, the standard is 5 years from the date the judgment became final, and for an actual sentence of imprisonment or heavier, 5 years from the date the sentence was completed or exempted; you are also disqualified if, in the last 3 years, you received an immigration fine of 5 million won or more for violating the Immigration Act, or your combined immigration fines total 7 million won or more. Even after these periods, if you have violated Korean law within the last 10 years you may be required to complete law-abiding citizenship education, while those with no more than 1 violation that resulted in non-indictment or a fine, immigration fine or administrative fine of 1 million won or less may be approved without the education. Confirm the starting date with the court judgment and payment receipt, then decide when to apply."
      },
      {
        "id": "f5-revocation",
        "chip": "PR cancellation",
        "q": "Can a permanent resident (F-5) in Korea lose their permanent residence status after a criminal conviction?",
        "a": "It can be cancelled only in specified cases. Grounds for cancellation include a finalized sentence of 2 years or more of imprisonment for offenses under laws designated by Ministry of Justice ordinance, such as the Criminal Act and the Act on Special Cases Concerning the Punishment of Sexual Crimes, and finalized prison sentences totaling 3 years or more within the last 5 years; if permanent residence was obtained by false or fraudulent means, it must be cancelled. Even if it is cancelled, you can be granted a general status of stay on application if continued stay is found necessary and you meet its requirements, and if a hearing is held you will be notified at least 7 days before. Prepare the court judgment, documents on your family and life in Korea, and the documents required for a general status of stay in advance."
      },
      {
        "id": "naturalization",
        "chip": "Fines and naturalization",
        "q": "Does a record of a criminal fine affect my application for Korean naturalization?",
        "a": "It can. General naturalization requires meeting a good conduct requirement set by Ministry of Justice ordinance, such as abiding by the law, so disposition records such as a fine are checked in naturalization screening. General naturalization also requires holding a status of stay that permits permanent residence, so you may first be stopped by the good conduct standard at the stage of changing to permanent residence (F-5). The conduct standard for naturalization is set separately from the standards for stay permits, so organize the court judgment, payment receipts and documents showing your compliance with the law since then, and confirm before applying whether you meet the standard."
      },
      {
        "id": "f2-civic-education",
        "chip": "F-2 civic education",
        "q": "I want to extend my residence (F-2) stay in Korea. Will I be told to take law-abiding citizenship education because of an old fine?",
        "a": "Among people expected to be granted a change or extension of residence (F-2) status, those found to have violated Korean law are required to complete law-abiding citizenship education. The violation period is counted from the date the case was closed (the date of non-indictment, or the date a fine or similar was paid), and violations within 5 years apply to extension of period of stay and within 10 years to change of status. Those required to take it must complete the education at their first extension application before the next extension, and if another violation is found after that, they can extend only after completing the education. You apply for the education through the Social Integration Information Network or the immigration integration support center of the competent immigration office."
      },
      {
        "id": "f6-change",
        "chip": "Changing to F-6",
        "q": "Can a foreign spouse with a criminal record change their status of stay to spouse of a Korean national (F-6-1) in Korea?",
        "a": "When changing to spouse of a Korean national (F-6-1) within Korea, general criminal offenders are in principle not allowed to change status and must leave, obtain a visa from a Korean mission abroad, and then enter. However, people who received only a simple fine are excluded from this restriction. Criminal offenders (except those who received only a simple fine) are also restricted when changing to the status for those whose marriage has ended (F-6-3). Even where a change is possible, attach the court judgment and payment receipt to the application, passport, residence card and marriage documents to explain the case."
      },
      {
        "id": "f4-total-fines",
        "chip": "F-4 restrictions",
        "q": "Is overseas Korean (F-4) status restricted if fines or immigration fines add up?",
        "a": "When granting overseas Korean (F-4) status and similar, a person is restricted if their total fines for violating Korean law reach 7 million won or more and 3 years have not passed since full payment of the fine that brought the total to 7 million won or more, and likewise if their total immigration fines for violating the Immigration Act reach 7 million won or more and 3 years have not passed in the same way. For immigration fines, the restriction period is reduced to 1 year if a performance certificate from the Korea Central Volunteer Center confirms 100 hours or more of volunteer work over 6 months or more. People sentenced to imprisonment or heavier for drugs, voice phishing or repeated (3 or more times) drunk driving, and people sentenced to imprisonment or heavier or a suspended sentence for other crimes where 5 years have not passed, are also restricted. Calculate the total and the full-payment date from the court judgment and payment receipt for each disposition, then decide when to apply."
      },
      {
        "id": "e74-points",
        "chip": "E-7-4 and fines",
        "q": "I want to switch to the skilled worker (E-7-4) points system in Korea. What happens if I have a criminal fine on my record?",
        "a": "Under the skilled worker (E-7-4) points system, anyone sentenced to a fine of 3 million won or more within the last 10 years is excluded and cannot apply. If the fine was under 3 million won you can apply, but up to 20 points are deducted depending on the number of cases within 10 years of the application date, and up to 15 points are deducted depending on the number of times you were dealt with for Immigration Act violations. Violating the Immigration Act 4 or more times or overstaying for 3 months or more within the last 10 years are also grounds for exclusion. Gather your court judgments and disposition history and first calculate whether your score after deductions still meets the threshold."
      },
      {
        "id": "d10-change",
        "chip": "D-10 and fines",
        "q": "Can I change to a job seeker (D-10) visa in Korea if I have a criminal fine or immigration fine on my record?",
        "a": "Under the common job seeker (D-10) standards, you are restricted if, counting from the application date, you were sentenced to a fine of 3 million won or more within 3 years, sentenced to imprisonment or heavier within 5 years, or received deportation or a departure order for violating the Immigration Act within 5 years. Immigration fines for violating the Immigration Act lead to restriction where the integrated standards for restricting stay permits apply, that is, 5 million won or more for a first offense, or a combined total of 7 million won or more within the last 3 years for repeat offenses. If you do not fall under these standards, submit your disposition documents along with the application, passport, residence card and other basic documents and explain the circumstances. Periods are counted from the sentencing date and disposition date, so check the dates on your documents first."
      },
      {
        "id": "extension-denied",
        "chip": "Deadline after denial",
        "q": "If my extension of stay in Korea is denied because of a criminal disposition, by when do I have to leave?",
        "a": "If the extension is denied, the departure deadline is written on the notice informing you of the denial, and it is set within 14 days from the date of issue. However, if the Minister of Justice finds it necessary, the expiry date of your already permitted period of stay may be set as the departure deadline, and if a change of status is denied, you may be allowed to continue staying under your existing status. Check the notice and your passport and prepare to leave within the deadline. Missing the deadline is a new overstay violation, so manage your schedule from the day you receive the notice."
      },
      {
        "id": "extension-under-investigation",
        "chip": "Extension during investigation",
        "q": "I was investigated by Korean police and no decision has been made yet. Will it affect my visa, and should I still apply to extend my stay?",
        "a": "You should. An extension of period of stay must be applied for before your period of stay ends, and if you wait for the investigation to finish and miss the deadline, that itself becomes a violation. Immigration can also obtain investigation record information during stay permit screening, so it is best to submit a written explanation of the stage and circumstances of the case together with your application. Prepare the extension application, passport, residence card, documents for your status, and documents showing the progress of the case, such as a police summons."
      },
      {
        "id": "cancellation-hearing",
        "chip": "Permit cancellation hearing",
        "q": "Korean immigration sent me a notice to attend a hearing before they decide whether to cancel my stay permit. What should I do?",
        "a": "Check the reasons for cancellation or change and the hearing date and time on the notice, then prepare a written opinion and documents addressing those reasons and attend. Immigration must notify you of the reasons and the date, time and place at least 7 days before the hearing, so your preparation time from receiving the notice is short. Grounds for cancelling a permit include breach of permit conditions, a permit obtained by false or fraudulent means, and serious violations of the Immigration Act or other laws, so documents showing the seriousness of the case and your life in Korea are important. If your permit is cancelled you may become subject to a departure order, so submit your court judgment and family and employment documents without omission."
      },
      {
        "id": "suspended-sentence",
        "chip": "Suspended sentence",
        "q": "How does a suspended sentence affect a foreign national's status of stay screening in Korea?",
        "a": "A suspended sentence of imprisonment or heavier is treated as a disqualification for many statuses. For a change to permanent residence (F-5), the good conduct requirement is not met until 5 years have passed from the date the suspended sentence became final; for a change to points-based talent residence (F-2), being sentenced to imprisonment or heavier (including a suspended sentence) within 5 years of the application date is disqualifying; and overseas Korean (F-4) status is also restricted until 5 years have passed from the date the suspended sentence became final. Whether the period runs from the finalization date or the sentencing date differs by status, so prepare the court judgment and documents confirming the finalization date and calculate the period."
      }
    ],
    "terms": [
      {
        "term": "Extension of period of stay (체류기간 연장허가)",
        "def": "Permission from the Minister of Justice that a foreign national who wishes to stay beyond the permitted period of stay must obtain before that period ends."
      },
      {
        "term": "Change of status of stay (체류자격 변경허가)",
        "def": "Permission from the Minister of Justice that a foreign national must obtain in advance to engage in activities belonging to a status of stay different from their current one."
      },
      {
        "term": "Good conduct requirement (품행단정 요건)",
        "def": "One of the requirements for obtaining permanent residence status, meaning that the person's conduct is good, such as abiding by the laws of Korea."
      },
      {
        "term": "Integrated standards for restricting stay permits (체류허가 제한 통합기준)",
        "def": "The Ministry of Justice's stay screening standards applied when deciding whether to restrict stay permits for people who have received immigration fines and similar."
      },
      {
        "term": "Law-abiding citizenship education (준법시민교육)",
        "def": "Education that people expected to be granted statuses such as residence (F-2) or permanent residence (F-5) must complete if they are found to have violated Korean law."
      },
      {
        "term": "Cancellation or change of stay permit (체류허가 취소·변경)",
        "def": "A disposition by which the Minister of Justice cancels or changes a permit already granted, in cases such as breach of permit conditions, a permit obtained by false or fraudulent means, or serious violations of law."
      },
      {
        "term": "Special rule on cancelling permanent residence status (영주자격 취소 특례)",
        "def": "The rule that permanent residence status of a foreign national can be cancelled only in cases set by law, such as certain finalized sentences, fraudulent acquisition, or acts contrary to national interests."
      },
      {
        "term": "General status of stay (일반체류자격)",
        "def": "A status of stay under which the period a person may stay in Korea is limited, divided into short-term and long-term statuses of stay."
      }
    ],
    "clients": [
      "Long-term residents deciding when to apply for permanent residence (F-5) after receiving a criminal fine",
      "E-7 workers approaching an extension of stay after a fine for drunk driving",
      "E-9 workers with a criminal disposition record preparing to switch to skilled worker (E-7-4)",
      "Overseas Koreans checking whether their combined fines restrict overseas Korean (F-4) status",
      "Marriage migrants (F-6) who received a notice of a stay permit cancellation hearing"
    ]
  }
};
